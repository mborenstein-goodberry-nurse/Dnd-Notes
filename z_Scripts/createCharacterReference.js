/**
 * QuickAdd User Script: createCharacterReference
 *
 * Use this single script in two places:
 *  1. A standalone "Macro - New Character Reference" choice.
 *  2. As a User Script step in "Macro - New Campaign", after the
 *     step that supplies {{VALUE:Campaign}} and creates the campaign folder.
 *
 * Reads the static template at TEMPLATE_PATH and creates one reference
 * per campaign. Never overwrites an existing reference.
 */

const TEMPLATE_PATH = "z_Templates/1. Story World Templates/Notes/Character Reference.md";
const CAMPAIGNS_ROOT = "Campaigns";
const FILE_NAME = "Character Reference.md";

module.exports = async (params) => {
    const { app, quickAddApi, variables, obsidian } = params;

    function isFolder(item) {
        return !!item && Array.isArray(item.children);
    }

    function show(message) {
        if (obsidian && obsidian.Notice) new obsidian.Notice(message);
        else console.log(message);
    }

    const root = app.vault.getAbstractFileByPath(CAMPAIGNS_ROOT);
    if (!isFolder(root)) {
        throw new Error(`Campaign folder missing: ${CAMPAIGNS_ROOT}`);
    }

    // The campaign-creation macro already collects this variable. Reuse it!
    const suppliedCampaign = typeof variables.Campaign === "string"
        ? variables.Campaign.trim()
        : "";

    let campaign = suppliedCampaign;

    if (!campaign) {
        // If run from inside a campaign, default to that campaign.
        const activePath = app.workspace.getActiveFile()?.path ?? "";
        const parts = activePath.split("/");
        if (parts.length >= 3 && parts[0] === CAMPAIGNS_ROOT) {
            const folder = app.vault.getAbstractFileByPath(`${CAMPAIGNS_ROOT}/${parts[1]}`);
            if (isFolder(folder)) campaign = parts[1];
        }
    }

    if (!campaign) {
        // From outside a campaign, let the user choose an existing campaign.
        const names = root.children.filter(isFolder).map(folder => folder.name)
            .sort((a, b) => a.localeCompare(b));
        if (!names.length) throw new Error("No campaign folders found.");
        campaign = await quickAddApi.suggester(names, names);
        if (!campaign) return; // User cancelled.
    }

    if (campaign.includes("/") || campaign.includes("\\") || campaign === "." || campaign === "..") {
        throw new Error(`Invalid campaign folder name: ${campaign}`);
    }

    const folderPath = `${CAMPAIGNS_ROOT}/${campaign}`;
    const folder = app.vault.getAbstractFileByPath(folderPath);
    if (!isFolder(folder)) {
        throw new Error(`Campaign folder not found: ${folderPath}`);
    }

    variables.Campaign = campaign;
    const automaticallyCreating = !!suppliedCampaign;

    // Recognize renamed references, too, so running the macro again doesn't
    // accidentally create a second character cheat sheet.
    const existing = app.vault.getMarkdownFiles().find(file => {
        if (!file.path.startsWith(`${folderPath}/`)) return false;
        const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
        return frontmatter?.subtype === "Character Reference"
            || file.basename === "Character Reference"
            || file.basename.endsWith(" - Character Reference");
    });

    if (existing) {
        show(`Character Reference already exists for ${campaign}.`);
        if (!automaticallyCreating) await app.workspace.getLeaf(true).openFile(existing);
        return;
    }

    const template = app.vault.getAbstractFileByPath(TEMPLATE_PATH);
    if (!template || template.extension !== "md") {
        throw new Error(`Character Reference template not found: ${TEMPLATE_PATH}`);
    }

    // JSON strings are valid quoted YAML scalar values and escape punctuation.
    const content = (await app.vault.read(template))
        .replaceAll("%%CAMPAIGN_YAML%%", JSON.stringify(campaign))
        .replaceAll("%%CAMPAIGN_TEXT%%", campaign)
        .replaceAll("%%CAMPAIGN_NOTE_PATH%%", `${folderPath}/${campaign}`);

    const filePath = `${folderPath}/${FILE_NAME}`;
    if (app.vault.getAbstractFileByPath(filePath)) {
        show(`Character Reference already exists for ${campaign}.`);
        return;
    }

    const newFile = await app.vault.create(filePath, content);
    show(`Character Reference created for ${campaign}.`);

    // When called during campaign setup, preserve the macro's active editor.
    // When called manually, open the new reference for customization.
    if (!automaticallyCreating) await app.workspace.getLeaf(true).openFile(newFile);
};
