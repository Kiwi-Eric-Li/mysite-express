const settingModel = require("./model/settingModel");

module.exports.getSettingDao = async function(){
    return await settingModel.findOne();
}

module.exports.updateSettingDao = async function(newSettingInfo){
    await settingModel.update(newSettingInfo, {
        where: {
            id: 1
        }
    });
    return await settingModel.findOne();
}