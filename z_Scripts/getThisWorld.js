function getThisWorld (tp) {
    const thisFolder = tp.file.folder(false)
    if (thisFolder == "Name of folder"){
        return "Name of world";
    }
    const fullPath = tp.file.folder(true);
    console.log("Folder Name: " + fullPath);
    const folders = fullPath.split('/');
    if (folders.length >= 2) {
        const twoPathsUp = folders[folders.length - 2];
        console.log("World Name: " + twoPathsUp);
        return twoPathsUp;
    } else {
        return thisFolder;
    }
}
module.exports = getThisWorld;