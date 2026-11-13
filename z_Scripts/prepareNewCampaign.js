
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

    // 6. Create a small editable Calendarium calendar for this campaign.
    // Existing calendars, even custom ones, must never be changed here.
    // Calendarium 2.1.0 exposes its settings store internally; this is not
    // a documented public API. A failure must not abort campaign creation.
    let calendarNeedsReview = false;
    const calendarium = app.plugins?.plugins?.["calendarium"];

    try {
        if (!calendarium || typeof calendarium.settings$?.addCalendar !== "function") {
            calendarNeedsReview = true;
            console.warn("Campaign created; Calendarium is unavailable for automatic calendar setup.");
        } else if (calendarium.calendars?.some(cal => cal.name === campaign)) {
            // Reuse a matching calendar. Never modify the user's dates or custom calendar.
            console.log(`Existing Calendarium calendar "${campaign}" preserved.`);
        } else {
            const templatePath = "z_System/Default Campaign Calendar.json";
            if (!await app.vault.adapter.exists(templatePath)) {
                throw new Error(`Missing calendar template: ${templatePath}`);
            }
            const calendar = JSON.parse(await app.vault.adapter.read(templatePath));
            if (!Array.isArray(calendar?.static?.weekdays) ||
                !Array.isArray(calendar?.static?.months) ||
                !calendar.current || !Array.isArray(calendar.events)) {
                throw new Error("Default Campaign Calendar.json is malformed.");
            }

            // Dates are one-based for day, zero-based for month in Calendarium.
            calendar.name = campaign;
            const makeId = () =>
                `ID_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
            calendar.id = makeId();
            for (const group of ["weekdays", "months", "moons", "leapDays", "eras"]) {
                for (const item of calendar.static[group] ?? []) item.id = makeId();
            }
            for (const item of calendar.categories ?? []) item.id = makeId();
            for (const item of calendar.events ?? []) item.id = makeId();

            await calendarium.settings$.addCalendar(calendar);
            if (!calendarium.calendars?.some(cal => cal.name === campaign)) {
                throw new Error("Calendarium did not retain the newly created calendar.");
            }
            console.log(`Created starter Calendarium calendar "${campaign}" (1 January, Year 1).`);
        }
    } catch (error) {
        calendarNeedsReview = true;
        console.warn(`Could not automatically set up calendar "${campaign}":`, error);
    }

    if (calendarNeedsReview) {
        // Warn without preventing creation of the campaign's files and templates.
        try {
            const { Notice } = require("obsidian");
            new Notice(`Calendar not created. Set up a Calendarium calendar named "${campaign}" before Session 1.`, 10000);
        } catch (noticeError) {
            console.warn("Please create a matching Calendarium calendar manually.", noticeError);
        }
    }

    // 7. Pass values to subsequent QuickAdd steps.
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
