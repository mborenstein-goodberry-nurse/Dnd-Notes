
module.exports = async (params) => {
    const { app, quickAddApi } = params;

    const activeFile = app.workspace.getActiveFile();

    if (!activeFile) {
        throw new Error(
            "Open a campaign dashboard or Map Note before creating an Organization."
        );
    }

    const frontmatter =
        app.metadataCache.getFileCache(activeFile)?.frontmatter;

    const world = frontmatter?.world;

    if (!world || typeof world !== "string") {
        throw new Error("The active note needs a world property.");
    }

    // Map Notes store their campaign in frontmatter.
    // Campaign dashboards use their parent folder.
    const isMap = frontmatter?.type === "Map";

    const campaign = isMap
        ? frontmatter.campaign
        : activeFile.parent.name;

    if (!campaign || typeof campaign !== "string") {
        throw new Error("Could not determine the campaign.");
    }

    // Prompt for the Organization's name.
    const organizationName =
        (await quickAddApi.inputPrompt("Organization Name"))?.trim();

    if (!organizationName) {
        throw new Error(
            "Organization creation cancelled: no name provided."
        );
    }

    if (/[\\/:*?"<>|]/.test(organizationName)) {
        throw new Error(
            "The Organization name contains invalid filename characters."
        );
    }

    const folder = `Worlds/${world}/Organizations`;
    const existingPath = `${folder}/${organizationName}.md`;

    if (app.vault.getAbstractFileByPath(existingPath)) {
        throw new Error(
            `An Organization named "${organizationName}" already exists in ${folder}.`
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
    params.variables = params.variables || {};

    params.variables.world = world;
    params.variables.campaign = campaign;
    params.variables.organizationsFolder = folder;
    params.variables.organizationName = organizationName;
};
