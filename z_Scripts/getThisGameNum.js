function getThisGameNum(tp) {
    const folderPath = tp.file.folder(true);
    const folders = folderPath.split("/");

    const campaignFolder = folders[folders.length - 2];
    if (!campaignFolder) return "0";

    const sessionFolderPath = `Campaigns/${campaignFolder}/Session Journal`;

    const sessionNums = app.vault.getMarkdownFiles()
        .filter(file => file.parent?.path === sessionFolderPath)
        .map(file => {
            const cache = app.metadataCache.getFileCache(file);
            const fm = cache?.frontmatter;

            if (String(fm?.type || "").toLowerCase() !== "session journal") return null;

            const n = Number(fm?.sessionNum);
            return Number.isFinite(n) ? n : null;
        })
        .filter(n => n !== null);

    if (sessionNums.length === 0) return "0";

    return String(Math.max(...sessionNums) + 1);
}

module.exports = getThisGameNum;