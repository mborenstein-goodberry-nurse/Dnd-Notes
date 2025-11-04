function lastGameTitle (tp) {
    const fullPath = tp.file.folder(true);
    // console.log("Folder Name: " + fullPath);
    const folders = fullPath.split('/');
    const thisWorld = folders[folders.length - 2];
    // console.log(app.plugins.plugins.dataview.api.pages(`"ttrpgs/${thisCampaign}"`));
    // console.log(thisWorld);
    const titles = app.plugins.plugins.dataview.api
        .pages(`"Campaigns/${thisWorld}/Session Journal"`)
        .where(page => {
            if (page.type === 'session') {
                return true;
            }
        })
        .sort(b => b.sessionNum)
    // console.log(titles)
    if (titles.length > 1) {
        const filename = JSON.stringify(titles[titles.length-2].file.path).replace("\"","").replace("\"","").replace(".md","");
        return filename
    } else {
        return "No games found";
    }
    
}
module.exports = lastGameTitle;