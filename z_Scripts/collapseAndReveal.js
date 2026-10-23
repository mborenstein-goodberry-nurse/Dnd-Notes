
module.exports = async (params) => {
    const { app } = params;

    const activeFile = app.workspace.getActiveFile();

    if (!activeFile) {
        throw new Error("No active file to reveal.");
    }

    const explorerLeaves = app.workspace.getLeavesOfType(
        "file-explorer"
    );

    if (!explorerLeaves.length) {
        throw new Error("No File Explorer pane is open.");
    }

    const explorer = explorerLeaves[0].view;

    // Access the File Explorer's internal file items.
    const fileItems = explorer.fileItems;

    if (!fileItems) {
        throw new Error(
            "This Obsidian version does not expose fileItems."
        );
    }

    let collapsedCount = 0;

    // Collapse folders, starting with the deepest.
    const folderItems = Object.values(fileItems)
        .filter(item =>
            item.file?.children !== undefined &&
            typeof item.setCollapsed === "function"
        )
        .sort((a, b) =>
            b.file.path.split("/").length -
            a.file.path.split("/").length
        );

    for (const item of folderItems) {
        item.setCollapsed(true);
        collapsedCount++;
    }

    // Allow the File Explorer to update.
    await new Promise(resolve => setTimeout(resolve, 100));

    // Reveal the active file.
    await app.commands.executeCommandById(
        "file-explorer:reveal-active-file"
    );

    // Display a result so we know whether collapsing worked.
    console.log(
    `Collapsed ${collapsedCount} folders and revealed ${activeFile.basename}.`
    );
};
