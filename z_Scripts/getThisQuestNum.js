function getThisQuestNum(tp) {
    const folderPath = tp.file.folder(true);
    const folders = folderPath.split("/");

    // Expected path: Campaigns/<Campaign Name>/Quest Board
    const campaignFolder = folders[folders.length - 2];
    if (!campaignFolder) {
        console.log("getThisQuestNum: Could not determine campaign folder from", folderPath);
        return "0";
    }

    const questFolderPath = `Campaigns/${campaignFolder}/Quest Board`;

    const questNums = app.vault.getMarkdownFiles()
        .filter(file => file.parent?.path === questFolderPath)
        .map(file => {
            const cache = app.metadataCache.getFileCache(file);
            const fm = cache?.frontmatter;

            if (String(fm?.type || "").toLowerCase() !== "quest") return null;

            const n = Number(fm?.questNum);
            return Number.isFinite(n) ? n : null;
        })
        .filter(n => n !== null);

    if (questNums.length === 0) {
        console.log(`getThisQuestNum: No quest files found in ${questFolderPath}`);
        return "0";
    }

    const nextQuestNum = Math.max(...questNums) + 1;
    console.log(`getThisQuestNum: Next quest number is ${nextQuestNum}`);

    return String(nextQuestNum);
}

module.exports = getThisQuestNum;