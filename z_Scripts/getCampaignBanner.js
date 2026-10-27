module.exports = async function (tp, height = 380) {
    const DEFAULT_BANNER = "z_Assets/System/RPG Group.jpg";

    // Identify the current campaign
    const campaign = await tp.user.getThisCampaign(tp);
    if (!campaign) return "";

    // Find the campaign's main note
    const campaignPath = `Campaigns/${campaign}/${campaign}.md`;
    const campaignFile = app.vault.getAbstractFileByPath(campaignPath);

    if (!campaignFile) return "";

    // Read its banner property
    const frontmatter = app.metadataCache.getFileCache(campaignFile)?.frontmatter;
    const banner = frontmatter?.banner;

    // No banner or default banner? Add nothing.
    if (typeof banner !== "string") return "";

    const normalized = banner.trim().replace(/\\/g, "/");

    if (!normalized || normalized === DEFAULT_BANNER) {
        return "";
    }

    // Custom banner found! Add banner properties.
    return [
        `banner: ${JSON.stringify(banner.trim())}`,
        `banner-height: ${height}`,
        `content-start-position: ${height}`
    ].join("\n") + "\n";
};
