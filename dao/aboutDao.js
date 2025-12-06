
const aboutModel = require("./model/aboutModel");

// 获取
module.exports.getAboutDao = async function(){
    return await aboutModel.findOne();
}


// 修改
module.exports.updateAboutDao = async function(newUrl){
    let data = await aboutModel.findOne();
    data.url = newUrl;
    await data.save();
    return data.dataValues;
}

