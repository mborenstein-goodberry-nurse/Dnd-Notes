
module.exports = async (params) => {
    const { app, variables } = params;

    // Read the campaign name supplied by QuickAdd.
    const campaign = variables.Campaign;

    if (!campaign) {
        throw new Error(
            "Campaign name not found. Run this after the campaign creation step."
        );
    }

    const folderPath = `Campaigns/${campaign}/Mysteries`;

    // Check whether the folder already exists.
    if (app.vault.getAbstractFileByPath(folderPath)) {
        return;
    }

    // Create the folder.
    await app.vault.createFolder(folderPath);
};
