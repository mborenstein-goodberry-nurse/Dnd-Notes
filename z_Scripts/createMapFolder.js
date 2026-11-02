
module.exports = async (params) => {
    const { app, quickAddApi } = params;

    // Get the active campaign dashboard
    const activeFile = app.workspace.getActiveFile();

    if (!activeFile) {
        throw new Error("Open a campaign dashboard first.");
    }

    const cache = app.metadataCache.getFileCache(activeFile);
    const world = cache?.frontmatter?.world;
    const campaign = activeFile.parent?.name;

    if (!world || !campaign) {
        throw new Error(
            "Could not determine the world or campaign."
        );
    }

    // Ask for the new map's name
    const mapName = (
        await quickAddApi.inputPrompt("Map Name")
    )?.trim();

    if (!mapName) {
        throw new Error("Map creation cancelled.");
    }

    if (/[\\/:*?"<>|]/.test(mapName)) {
        throw new Error(
            "Map name contains invalid filename characters."
        );
    }

    // Canonical world-level maps
    const mapsFolder = `Worlds/${world}/Maps`;

    // Create the folder if it doesn't exist
    const parts = mapsFolder.split("/");
    let currentPath = "";

    for (const part of parts) {
        currentPath = currentPath
            ? `${currentPath}/${part}`
            : part;

        if (!app.vault.getAbstractFileByPath(currentPath)) {
            await app.vault.createFolder(currentPath);
        }
    }

    // Prevent duplicate map filenames
    const existingPath = `${mapsFolder}/${mapName}.md`;

    if (app.vault.getAbstractFileByPath(existingPath)) {
        throw new Error(
            `A map named "${mapName}" already exists in this world.`
        );
    }

    // Supply variables to the QuickAdd Template step
    params.variables = params.variables || {};
    params.variables.world = world;
    params.variables.campaign = campaign;
    params.variables.mapsFolder = mapsFolder;
    params.variables.mapName = mapName;
};
