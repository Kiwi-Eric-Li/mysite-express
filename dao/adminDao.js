// 这一层负责和数据库打交道
const adminModel = require("./model/adminModel");

// 登录
module.exports.loginDao = async function(loginInfo){
    const result = await adminModel.findOne({
        where: {
            loginId: loginInfo.loginId,
            loginPwd: loginInfo.loginPwd
        }
    });
    return result;
}

// 更新
module.exports.updateAdminDao = async function(newAccountInfo){
    return await adminModel.update(newAccountInfo, {
        where: {
            loginId: newAccountInfo.loginId
        }
    });
}

