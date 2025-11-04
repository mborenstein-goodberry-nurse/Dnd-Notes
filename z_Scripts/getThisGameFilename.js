module.exports = (params) => {
    console.log(params);
    let thisCampaign = params.app.workspace.getActiveFile().parent.path.slice(10);
    console.log(thisCampaign);
    console.log(app.plugins.plugins.dataview.api
        .pages(`"Campaigns/${thisCampaign}/Session Journal"`));
    let numOfGames = app.plugins.plugins.dataview.api
        .pages(`"Campaigns/${thisCampaign}/Session Journal"`)
        .where(page => {
            if (page.type === 'session') {
                if (page.campaign === thisCampaign) {
                    return true;
                } else {
                    console.log("Session");
                    console.log(page.campaign);
                }
            } else {
                console.log("Type");
                console.log(page.type);
            }
        }).length;

    numOfGames = JSON.stringify(numOfGames+0);
    console.log(numOfGames);
    while (numOfGames.length < 3) {
        numOfGames = "0" + numOfGames;
    }
    
    // Get the date
    let dateNow = moment().format('MM-DD-YYYY'); // now() -> 2023-01-23

    // Put filename together
    let filename = numOfGames + '. ' + dateNow;
    params.variables["thisGameFilename"] = filename;
    params.variables["folderName"] = 'Campaigns/' + thisCampaign;
    
};