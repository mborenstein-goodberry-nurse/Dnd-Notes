function lastGameTitle(tp) {
    const folderPath = tp.file.folder(true);
    const folders = folderPath.split("/");

    const campaignFolder = folders[folders.length - 2];
    if (!campaignFolder) return "No games found";

    const sessionFolderPath = `Campaigns/${campaignFolder}/Session Journal`;
    const currentNum = Number(tp.user.getThisGameNum(tp));

    if (!Number.isFinite(currentNum) || currentNum <= 0) {
        return "No games found";
    }

    const targetNum = currentNum - 1;

    const previous = app.vault.getMarkdownFiles()
        .filter(file => file.parent?.path === sessionFolderPath)
        .map(file => {
            const cache = app.metadataCache.getFileCache(file);
            const fm = cache?.frontmatter;

            if (String(fm?.type || "").toLowerCase() !== "session journal") return null;

            const sessionNum = Number(fm?.sessionNum);
            if (!Number.isFinite(sessionNum)) return null;
            if (sessionNum !== targetNum) return null;

            return {
                path: file.path.replace(/\.md$/, ""),
                name: file.basename
            };
        })
        .filter(Boolean)[0];

    if (!previous) {
        return "No games found";
    }

    return `${previous.path}|${previous.name}`;
}

module.exports = lastGameTitle;