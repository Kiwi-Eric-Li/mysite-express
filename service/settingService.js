const {getSettingDao, updateSettingDao} = require("../dao/settingDao");
const {formatResponse} = require("../utils/tool");

module.exports.getSettingService = async function(){
    const {dataValues} = await getSettingDao();
    return formatResponse(0, "", dataValues);
}

module.exports.updateSettingService = async function(newSettingInfo){
    const {dataValues} = await updateSettingDao(newSettingInfo);
    return formatResponse(0, "", dataValues);
}

