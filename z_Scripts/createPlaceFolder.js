
module.exports = async (params) => {
    const { app, quickAddApi } = params;

    const activeFile = app.workspace.getActiveFile();

    if (!activeFile) {
        throw new Error("Open a campaign dashboard before creating a Place.");
    }

    const frontmatter =
        app.metadataCache.getFileCache(activeFile)?.frontmatter;

    const world = frontmatter?.world;

    if (!world || typeof world !== "string") {
        throw new Error("The active note needs a world property.");
    }

    // Determine whether we're creating a Place from a Map Note.
    const isMap = frontmatter?.type === "Map";

    // Map Notes store their campaign in frontmatter.
    // Campaign dashboards use their parent folder.
    const campaign = isMap
        ? frontmatter.campaign
        : activeFile.parent.name;

    if (!campaign || typeof campaign !== "string") {
        throw new Error("Could not determine the campaign.");
    }

    // Automatically assign the active map as the Place's primary map.
    const primaryMap = isMap
        ? `[[${activeFile.basename}]]`
        : "";


    const placeName = (await quickAddApi.inputPrompt("Place Name"))?.trim();

    if (!placeName) {
        throw new Error("Place creation cancelled: no name provided.");
    }

    if (/[\\/:*?"<>|]/.test(placeName)) {
        throw new Error("The Place name contains invalid filename characters.");
    }

    const folder = `Worlds/${world}/Places`;
    const existingPath = `${folder}/${placeName}.md`;

    if (app.vault.getAbstractFileByPath(existingPath)) {
        throw new Error(
            `A Place named "${placeName}" already exists in ${folder}.`
        );
    }

    // Create the destination folder if necessary.
    const parts = folder.split("/");
    let currentPath = "";

    for (const part of parts) {
        currentPath = currentPath
            ? `${currentPath}/${part}`
            : part;

        if (!app.vault.getAbstractFileByPath(currentPath)) {
            await app.vault.createFolder(currentPath);
        }
    }

    // Supply variables to the next QuickAdd Template step.
    params.variables.world = world;
    params.variables.campaign = campaign;
    params.variables.placesFolder = folder;
    params.variables.placeName = placeName;
    params.variables.primaryMap = primaryMap;
};
