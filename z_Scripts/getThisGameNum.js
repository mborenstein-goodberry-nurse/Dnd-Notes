const getThisWorld = require("./getThisWorld");

function getThisGameNum (tp) {
    const fullPath = tp.file.folder(true);
    console.log("Folder Name: " + fullPath);
    const folders = fullPath.split('/');
    const twoPathsUp = folders[folders.length - 2];
    // console.log(app.plugins.plugins.dataview.api.pages(`"ttrpgs/${thisCampaign}"`));
    let numOfGames = app.plugins.plugins.dataview.api
        .pages(`"Campaigns/${twoPathsUp}/Session Journal"`)
        .where(page => {
            if (page.type === 'session') {
                if (page.campaign === thisCampaign) {
                    // console.log('sessionNum: ' + page.sessionNum);
                    return true;
                }
            }
        }).length
    // console.log('numOfGames: ' + numOfGames);
    numOfGames = JSON.stringify(numOfGames+1);
    /*
    while (numOfGames.length < 3) {
        numOfGames = "0" + numOfGames;
    }*/
    // console.log('numOfGames after adding: ' + numOfGames);
    return numOfGames;
}
module.exports = getThisGameNum;