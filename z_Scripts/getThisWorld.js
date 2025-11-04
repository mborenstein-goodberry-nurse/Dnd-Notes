function getThisWorld (tp) {
    const thisFolder = tp.file.folder(false)
    // console.log(thisFolder);
    if (thisFolder == "Name of folder"){
        return "Name of world";
    }
    const fullPath = tp.file.folder(true);
    // console.log("Folder Name: " + fullPath);
    const folders = fullPath.split('/');
    if (folders.length >= 2) {
        const twoPathsUp = folders[1];
        // console.log("World Name: " + twoPathsUp);
        return twoPathsUp;
    } else {
        console.log("Error: No Grandfather Folder");
        return thisFolder;
    }
}
module.exports = getThisWorld;