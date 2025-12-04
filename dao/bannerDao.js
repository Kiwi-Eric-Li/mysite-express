const bannerModel = require("./model/bannerModel");

module.exports.findBannerDao = async function(){
    return await bannerModel.findAll();
}