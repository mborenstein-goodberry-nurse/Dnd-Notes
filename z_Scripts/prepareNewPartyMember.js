
module.exports = async (params) => {
    const { app, quickAddApi } = params;

    const activeFile = app.workspace.getActiveFile();
    if (!activeFile) {
        throw new Error("Open a Campaign Dashboard before creating a party member.");
    }

    const cache = app.metadataCache.getFileCache(activeFile);
    const frontmatter = cache?.frontmatter ?? {};

    const campaign = String(frontmatter.campaign ?? "").trim();
    const world = String(frontmatter.world ?? "").trim();

    if (!campaign || !world) {
        throw new Error("The active note must have campaign and world properties.");
    }

    if (activeFile.path !== `Campaigns/${campaign}/${campaign}.md`) {
        throw new Error("Open the Campaign Dashboard before creating a party member.");
    }

    const character = (await quickAddApi.inputPrompt("Character Name"))?.trim();

    if (!character) {
        throw new Error("Character creation cancelled.");
    }

    if (/[\\/:*?"<>|]/.test(character) ||
        character === "." ||
        character === ".." ||
        character.endsWith(".")) {
        throw new Error("Character name contains invalid filename characters.");
    }

    const player = (await quickAddApi.inputPrompt("Player Name"))?.trim();

    if (player === undefined || player === null) {
        throw new Error("Character creation cancelled.");
    }

    const folder = `Campaigns/${campaign}/The Party`;
    const path = `${folder}/${character}.md`;

    if (app.vault.getAbstractFileByPath(path)) {
        throw new Error(`A party member named "${character}" already exists.`);
    }

    // Find existing character levels in this campaign
    const partyLevels = app.vault.getMarkdownFiles()
        .filter(file => file.path.startsWith(`${folder}/`))
        .map(file => app.metadataCache.getFileCache(file)?.frontmatter)
        .map(fm => Number(fm?.level))
        .filter(level => Number.isInteger(level) && level > 0);

    // Suggest the highest level, or 1 for an empty party
    const suggestedLevel = partyLevels.length
        ? Math.max(...partyLevels)
        : 1;

    const levelInput = await quickAddApi.inputPrompt(
        "Character Level",
        "Enter the new character's level",
        String(suggestedLevel)
    );

    const level = Number(levelInput?.trim());

    if (!Number.isInteger(level) || level < 1) {
        throw new Error("Character level must be a positive whole number.");
    }

    if (!app.vault.getAbstractFileByPath(folder)) {
        await app.vault.createFolder(folder);
    }

    params.variables.character = character;
    params.variables.player = player;
    params.variables.campaign = campaign;
    params.variables.world = world;
    params.variables.level = level;

    console.log(`Prepared party member "${character}" for "${campaign}".`);
};
