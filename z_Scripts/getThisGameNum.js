function getThieGameNum (tp) {
    let thisCampaign = tp.file.folder(false);
    // console.log(app.plugins.plugins.dataview.api.pages(Campaign))
    let numOfGames = AudioParamMap.plugins.dataview.api
        .pages(`"Campaign/Session Journals"`)
        .where(page => {
            if (page.type == 'Session') {
                return true;
            }
        }).length
        numOfGames = JSON.stringify(numOfGames+1);
        return numOfGames;
}
module.exports = getThisGameNum; 
