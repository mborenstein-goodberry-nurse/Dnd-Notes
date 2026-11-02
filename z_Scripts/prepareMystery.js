
module.exports = async (params) => {
    const { app, quickAddApi, variables } = params;

    const activeFile = app.workspace.getActiveFile();

    if (!activeFile) {
        throw new Error("Open a campaign note before creating a mystery.");
    }

    // Identify the campaign from the active note's path.
    const parts = activeFile.path.split("/");
    const campaignIndex = parts.indexOf("Campaigns");

    if (campaignIndex === -1 || !parts[campaignIndex + 1]) {
        throw new Error("The active note must be inside a campaign folder.");
    }

    const campaign = parts[campaignIndex + 1];
    const folderPath = `Campaigns/${campaign}/Mysteries`;

    // Ask for the mystery's name.
    const mystery = (await quickAddApi.inputPrompt(
        "New Mystery",
        "Enter the mystery's name"
    ))?.trim();

    if (!mystery) {
        throw new Error("Mystery creation cancelled.");
    }

    // Prevent invalid file names.
    if (/[\\/:*?"<>|]/.test(mystery)) {
        throw new Error("The mystery name contains invalid filename characters.");
    }

    // Prevent duplicate notes.
    const notePath = `${folderPath}/${mystery}.md`;

    if (app.vault.getAbstractFileByPath(notePath)) {
        throw new Error(`A mystery named "${mystery}" already exists.`);
    }

    // Create the folder if necessary.
    if (!app.vault.getAbstractFileByPath(folderPath)) {
        await app.vault.createFolder(folderPath);
    }

    // Pass variables to the QuickAdd template step.
    variables.Campaign = campaign;
    variables.Mystery = mystery;
};
