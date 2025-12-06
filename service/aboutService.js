
const {getAboutDao, updateAboutDao} = require("../dao/aboutDao");
const {formatResponse} = require("../utils/tool");

module.exports.getAboutService = async function(){
    const {url} = await getAboutDao();
    return formatResponse(0, "", url);
}

module.exports.updateAboutService = async function(newUrl){
    const {url} = await updateAboutDao(newUrl);
    return formatResponse(0, "", url);
}


