function getThisWorld (tp) {
    const fullPath = tp.file.folder(true);
    // console.log("Folder Name: " + fullPath);
    const folders = fullPath.split('/');
    const thisWorld = folders[1];
    const campaign = app.plugins.plugins.dataview.api
        .pages(`"Campaigns/${thisWorld}"`)
        .where(page => {
            if (page.type === 'Campaign') {
                console.log(page.title);
                console.log(page.world);
                return true;
            }
        })[0];
        // console.log("World Name: " + twoPathsUp);
    console.log(campaign.world);
    
    return campaign.world;
}
module.exports = getThisWorld;