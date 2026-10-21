
module.exports = async (params) => {
    const { app, quickAddApi } = params;

    // Get the file from which the macro was triggered.
    const activeFile = app.workspace.getActiveFile();

    if (!activeFile) {
        throw new Error("Open a campaign note before creating an NPC.");
    }

    // Determine campaign and world using the active note.
    const cache = app.metadataCache.getFileCache(activeFile);
    const frontmatter = cache?.frontmatter ?? {};

    let world = frontmatter.world;

    // Fall back to the existing world helper.
    // This assumes the helper can resolve the active campaign context.
    if (!world) {
        throw new Error(
            "No world property found in the active note. " +
            "Add world metadata or use your existing world helper."
        );
    }

    const campaign = activeFile.parent.name;

    params.variables.campaign = campaign;

    world = String(world).trim();

    // Prompt for the NPC's name.
    const npcName = await quickAddApi.inputPrompt("NPC Name");

    if (!npcName?.trim()) {
        throw new Error("NPC creation cancelled: no name entered.");
    }

    // Shared-world folder, relative to vault root.
    const folder = `Worlds/${world}/People`;

    // Create missing parent folders.
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

    // Make these available to subsequent QuickAdd steps.
    params.variables.world = world;
    params.variables.peopleFolder = folder;
    params.variables.npcName = npcName.trim();

    const existingPath = `${folder}/${npcName.trim()}.md`;

    if (app.vault.getAbstractFileByPath(existingPath)) {
        throw new Error(
            `An NPC named "${npcName}" already exists in ${folder}.`
        );
    }
};
