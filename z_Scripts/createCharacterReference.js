/**
 * Character Reference creator for Obsidian + QuickAdd.
 *
 * SAME SCRIPT, TWO WORKFLOWS:
 *  - In "Macro - New Campaign", the campaign name is already supplied in
 *    params.variables.Campaign. Create a generic Character Reference.md
 *    without prompting or opening a new tab.
 *  - Run alone via "Macro - New Character Reference": find the campaign,
 *    prompt for the character name, and create
 *    "<Name> - Character Reference.md". Multiple character references are
 *    allowed; never overwrite an existing file.
 *
 * Replaces the previous createCharacterReference.js. Uses the SAME existing
 * Character Reference.md template; no template replacement is necessary.
 */

const TEMPLATE_PATH = "z_Templates/1. Story World Templates/Notes/Character Reference.md";
const CAMPAIGNS_ROOT = "Campaigns";
const GENERIC_NAME = "Character Reference.md";

module.exports = async (params) => {
    const { app, quickAddApi, variables, obsidian } = params;

    const isFolder = (file) => !!file && Array.isArray(file.children);
    const notify = (message) => {
        if (obsidian?.Notice) new obsidian.Notice(message);
        else console.log(message);
    };
    const input = async (header, placeholder) => {
        try {
            return await quickAddApi.inputPrompt(header, placeholder);
        } catch (error) {
            if (error?.name === "MacroAbortError") return null;
            throw error;
        }
    };
    const choose = async (items) => {
        try {
            return await quickAddApi.suggester(items, items);
        } catch (error) {
            if (error?.name === "MacroAbortError") return null;
            throw error;
        }
    };
    const cleanName = (name, label) => {
        const cleaned = String(name ?? "").trim().replace(/\s+/g, " ");
        // Windows-invalid characters, plus characters that complicate Obsidian wikilinks.
        if (!cleaned || cleaned === "." || cleaned === ".." ||
            /[<>:"/\\|?*\[\]#^\x00-\x1f]/.test(cleaned) || /[. ]$/.test(cleaned) ||
            /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(?:\..*)?$/i.test(cleaned) ||
            cleaned.length > 120) {
            throw new Error(`Invalid ${label}: ${name}`);
        }
        return cleaned;
    };

    const root = app.vault.getAbstractFileByPath(CAMPAIGNS_ROOT);
    if (!isFolder(root)) throw new Error(`Campaign folder missing: ${CAMPAIGNS_ROOT}`);

    // QuickAdd shares this value from the earlier New Campaign template step.
    // A standalone invocation has no such variable, even when a campaign is open.
    const suppliedCampaign = typeof variables.Campaign === "string"
        ? variables.Campaign.trim()
        : "";
    const automated = !!suppliedCampaign;
    let campaign = suppliedCampaign;

    if (!campaign) {
        const activePath = app.workspace.getActiveFile()?.path ?? "";
        const parts = activePath.split("/");
        if (parts.length >= 3 && parts[0] === CAMPAIGNS_ROOT &&
            isFolder(app.vault.getAbstractFileByPath(`${CAMPAIGNS_ROOT}/${parts[1]}`))) {
            campaign = parts[1];
        }
    }

    if (!campaign) {
        const names = root.children.filter(isFolder).map(f => f.name)
            .sort((a, b) => a.localeCompare(b));
        if (!names.length) throw new Error("No campaign folders were found.");
        campaign = await choose(names);
        if (!campaign) return;
    }
    campaign = cleanName(campaign, "campaign name");

    const folderPath = `${CAMPAIGNS_ROOT}/${campaign}`;
    if (!isFolder(app.vault.getAbstractFileByPath(folderPath))) {
        throw new Error(`Campaign folder not found: ${folderPath}`);
    }
    if (automated) variables.Campaign = campaign;

    let characterName = "";
    let filename = GENERIC_NAME;
    if (!automated) {
        // This is the only extra question when running the standalone macro.
        const answer = await input("What character is this reference for?", "Character name");
        if (answer === null) return; // Cancelled.
        if (!answer?.trim()) {
            notify("No character name entered; no reference created.");
            return;
        }
        characterName = cleanName(answer, "character name");
        filename = `${characterName} - Character Reference.md`;
    }

    const targetPath = `${folderPath}/${filename}`;
    const campaignFiles = app.vault.getMarkdownFiles().filter(f =>
        f.path.startsWith(`${folderPath}/`));

    if (automated) {
        // Keep original safety behavior: never inject another generic reference
        // into a campaign that already has a reference, named or unnamed.
        const existing = campaignFiles.find(file => {
            const frontmatter = app.metadataCache.getFileCache(file)?.frontmatter;
            return frontmatter?.subtype === "Character Reference" ||
                file.basename === "Character Reference" ||
                file.basename.endsWith(" - Character Reference");
        });
        if (existing) {
            notify(`Character Reference already exists for ${campaign}; skipped.`);
            return;
        }
    }

    // Check exact target (case-insensitively, for cross-platform vault use).
    const existingTarget = campaignFiles.find(file =>
        file.path.toLocaleLowerCase() === targetPath.toLocaleLowerCase());
    if (existingTarget) {
        notify(`Reference already exists: ${existingTarget.basename}.`);
        if (!automated) await app.workspace.getLeaf(true).openFile(existingTarget);
        return;
    }
    if (app.vault.getAbstractFileByPath(targetPath)) {
        throw new Error(`A vault item already exists at ${targetPath}`);
    }

    const templateFile = app.vault.getAbstractFileByPath(TEMPLATE_PATH);
    if (!templateFile || templateFile.extension !== "md") {
        throw new Error(`Character Reference template not found: ${TEMPLATE_PATH}`);
    }

    let content = (await app.vault.read(templateFile))
        .replaceAll("%%CAMPAIGN_YAML%%", JSON.stringify(campaign))
        .replaceAll("%%CAMPAIGN_TEXT%%", campaign)
        .replaceAll("%%CAMPAIGN_NOTE_PATH%%", `${folderPath}/${campaign}`);

    if (characterName) {
        // Works with the existing v2 template: fill in basic name references,
        // without assuming a character note or character-sheet data exists.
        content = content
            .replace(/^character:[ \t]*$/m, `character: ${JSON.stringify(characterName)}`)
            .replace(/^# ✧ Character Reference[ \t]*$/m, `# ✧ ${characterName} - Character Reference`)
            .replace(/\*\*Character:\*\* \*Link your character note here\*/,
                `**Character:** ${characterName} (*add character-note link when available*)`);
    }

    // Recheck just before creating. Never clobber an existing note.
    if (app.vault.getAbstractFileByPath(targetPath)) {
        throw new Error(`Reference was created concurrently: ${targetPath}`);
    }
    const file = await app.vault.create(targetPath, content);
    notify(characterName
        ? `Created ${characterName}'s reference in ${campaign}.`
        : `Created Character Reference for ${campaign}.`);
    if (!automated) await app.workspace.getLeaf(true).openFile(file);
};
