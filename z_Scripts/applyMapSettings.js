module.exports = async (params) => {
    const { app } = params;
    const Notice = params.obsidian?.Notice;

    const file = app.workspace.getActiveFile();

    if (!file || file.extension !== "md") {
        new Notice("Open a Map Note first.");
        return;
    }

    const frontmatter =
        app.metadataCache.getFileCache(file)?.frontmatter;

    if (frontmatter?.type !== "Map") {
        new Notice("This note is not a Map.");
        return;
    }

    const number = (key, fallback) => {
        const raw = frontmatter[key];
        if (raw === undefined || raw === null || raw === "") {
            return fallback;
        }

        const value = Number(raw);
        if (!Number.isFinite(value)) {
            throw new Error(`Invalid map setting: ${key}`);
        }
        return value;
    };

    try {
        // Read configuration from the Map Note
        const width = number("map_width_x", 1080);
        const height = number("map_height_y", 748);
        const scalePixels = number("scale_pixels", 48);
        const scaleRange = number("scale_pixels_range", 50);
        const displayHeight = number("mapDisplayHeight", 500);
        const minZoom = number("mapMinZoom", -0.5);
        const maxZoom = number("mapMaxZoom", 1);
        const defaultZoom = number("mapDefaultZoom", -0.5);
        const zoomDelta = number("mapZoomDelta", 0.25);

        const unit = String(frontmatter.mapUnit || "feet");

        if (width <= 0 || height <= 0 ||
            scalePixels <= 0 || scaleRange <= 0 ||
            displayHeight <= 0 || zoomDelta <= 0) {
            throw new Error("Dimensions, scale and zoom increment must be positive.");
        }

        if (minZoom > maxZoom ||
            defaultZoom < minZoom ||
            defaultZoom > maxZoom) {
            throw new Error("Default zoom must be within the zoom limits.");
        }

        // Read the selected image, if supplied
        let image = frontmatter.mapImage;

        if (image && typeof image === "object") {
            image = image.path || image.file?.path || "";
        }

        image = String(image || "")
            .trim()
            .replace(/^!?\[\[/, "")
            .replace(/\]\]$/, "")
            .split("|")[0];

        const scale = scaleRange / scalePixels;

        // Map values to their Leaflet configuration keys
        const updates = {
            bounds: `[[0,0], [${height},${width}]]`,
            height: `${displayHeight}px`,
            lat: String(height / 2),
            long: String(width / 2),
            minZoom: String(minZoom),
            maxZoom: String(maxZoom),
            defaultZoom: String(defaultZoom),
            zoomDelta: String(zoomDelta),
            unit: unit,
            scale: String(scale)
        };

        // Only change the image if one is selected
        if (image) {
            const imageFile =
                app.metadataCache.getFirstLinkpathDest(
                    image,
                    file.path
                );

            if (!imageFile) {
                throw new Error(`Map image not found: ${image}`);
            }

            updates.image = `[[${imageFile.path}]]`;
        }

        const content = await app.vault.read(file);

        // Locate the first Leaflet code block
        const regex = /^([ \t]*)(`{3,}|~{3,})leaflet[^\r\n]*\r?\n([\s\S]*?)^\1\2[ \t]*$/m;
        const match = content.match(regex);

        if (!match) {
            throw new Error("No Leaflet code block found.");
        }

        const original = match[3];
        const lineEnding = original.includes("\r\n") ? "\r\n" : "\n";
        const lines = original.split(/\r?\n/);

        // Update managed settings while preserving other lines
        const seen = new Set();

        const updatedLines = lines.map(line => {
            const setting = line.match(
                /^(\s*)([A-Za-z][A-Za-z0-9]*):/
            );

            if (!setting) return line;

            const key = setting[2];

            if (!Object.prototype.hasOwnProperty.call(updates, key)) {
                return line;
            }

            if (seen.has(key)) {
                throw new Error(`Duplicate Leaflet setting: ${key}`);
            }

            seen.add(key);
            return `${setting[1]}${key}: ${updates[key]}`;
        });

        // Insert any missing managed settings
        for (const [key, value] of Object.entries(updates)) {
            if (!seen.has(key)) {
                updatedLines.push(`${key}: ${value}`);
            }
        }

        // Manage map-specific marker discovery
        const markerMode = String(
            frontmatter.mapMarkerMode || "assigned"
        ).trim().toLowerCase();

        if (!["assigned", "all", "manual"].includes(markerMode)) {
            throw new Error(`Invalid marker discovery mode: ${markerMode}`);
        }

        const world = String(frontmatter.world || "").trim();

        if (!world) {
            throw new Error("Map is missing its world property.");
        }

        const markerFolder = `Worlds/${world}/Places`;
        const mapName = file.basename;

        // Only one automatic discovery method should be active
        const linksLine = markerMode === "assigned"
            ? `linksTo: [[${mapName}]]`
            : `# linksTo: [[${mapName}]]`;

        const folderLine = markerMode === "all"
            ? `markerFolder: ${markerFolder}`
            : `# markerFolder: ${markerFolder}`;

        // Find existing settings, including commented-out settings
        const linksPattern = /^\s*#?\s*linksTo\s*:/;
        const folderPattern = /^\s*#?\s*markerFolder\s*:/;

        // Remove existing discovery settings
        // and clean up excess blank lines
        const filteredLines = updatedLines
            .filter(line =>
                !linksPattern.test(line) &&
                !folderPattern.test(line)
            )
            .filter((line, index, array) =>
                line.trim() !== "" ||
                (index > 0 && array[index - 1].trim() !== "")
            );

        // Remove trailing blank lines before adding marker settings
        while (
            filteredLines.length > 0 &&
            filteredLines[filteredLines.length - 1].trim() === ""
        ) {
            filteredLines.pop();
        }


        // Add settings before the final newline
        // so the closing code fence stays on its own line
        const hasTrailingEmptyLine =
            filteredLines[filteredLines.length - 1] === "";

        if (hasTrailingEmptyLine) {
            filteredLines.pop();
        }

        filteredLines.push(linksLine);
        filteredLines.push(folderLine);

        if (hasTrailingEmptyLine) {
            filteredLines.push("");
        }


        // Update the existing array in place
        updatedLines.length = 0;
        updatedLines.push(...filteredLines);


        const newBlock = updatedLines.join(lineEnding) + lineEnding;
        
        if (newBlock === original) {
            new Notice("Map settings are already up to date.");
            return;
        }

        const replacement = match[0].replace(original, newBlock);

        const newContent =
            content.slice(0, match.index) +
            replacement +
            content.slice(match.index + match[0].length);

        // Recheck before writing to avoid overwriting recent edits
        if (await app.vault.read(file) !== content) {
            throw new Error("The note changed during the update. Try again.");
        }

        await app.vault.modify(file, newContent);

        new Notice("Map settings applied successfully!");

    } catch (error) {
        new Notice(`Map update failed: ${error.message}`, 8000);
        console.error(error);
    }
};
