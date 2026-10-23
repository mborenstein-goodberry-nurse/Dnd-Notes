
module.exports = async (params) => {
    const { app, quickAddApi } = params;

    const validateName = (name, label) => {
        if (!name) {
            throw new Error(`${label} is required. Creation cancelled.`);
        }

        if (
            /[\\/:*?"<>|]/.test(name) ||
            name === "." ||
            name === ".." ||
            name.endsWith(".")
        ) {
            throw new Error(`${label} contains invalid filename characters.`);
        }
    };

    // 1. Ask for the campaign name.
    const campaign = (
        await quickAddApi.inputPrompt("New Campaign Name")
    )?.trim();

    validateName(campaign, "Campaign name");

    const campaignRoot = `Campaigns/${campaign}`;

    if (app.vault.getAbstractFileByPath(campaignRoot)) {
        throw new Error(
            `A campaign named "${campaign}" already exists.`
        );
    }

    // 2. Find existing worlds.
    const worldsRoot = app.vault.getAbstractFileByPath("Worlds");

    const existingWorlds = worldsRoot?.children
        ?.filter(item => item.children !== undefined)
        .map(item => item.name)
        .sort((a, b) => a.localeCompare(b)) ?? [];

    // 3. Select an existing world or enter a new one.
    const createNewLabel = "+ Create New World";

    const selectedWorld = await quickAddApi.suggester(
        [...existingWorlds, createNewLabel],
        [...existingWorlds, createNewLabel]
    );

    if (!selectedWorld) {
        throw new Error("World selection cancelled.");
    }

    const world = selectedWorld === createNewLabel
        ? (
            await quickAddApi.inputPrompt("New World Name")
          )?.trim()
        : selectedWorld;

    validateName(world, "World name");

    // 4. Define the new folder structure.
    const folders = [
        "Campaigns",
        campaignRoot,
        `${campaignRoot}/Quest Board`,
        `${campaignRoot}/Mysteries`,
        `${campaignRoot}/Session Journal`,
        `${campaignRoot}/The Party`,
        `${campaignRoot}/Other`,
        "Worlds",
        `Worlds/${world}`,
        `Worlds/${world}/People`,
        `Worlds/${world}/Places`,
        `Worlds/${world}/Organizations`,
        `Worlds/${world}/Maps`
    ];

    // 5. Create missing folders only.
    for (const path of folders) {
        if (!app.vault.getAbstractFileByPath(path)) {
            await app.vault.createFolder(path);
        }
    }

    // 6. Pass values to subsequent QuickAdd steps.
    params.variables.Campaign = campaign;
    params.variables.World = world;

    params.variables.campaign = campaign;
    params.variables.world = world;

    params.variables.campaignFolder = campaignRoot;
    params.variables.worldFolder = `Worlds/${world}`;

    console.log(
        `Prepared campaign "${campaign}" in world "${world}".`
    );
};
