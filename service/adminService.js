// admin 模块的业务逻辑层
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const {loginDao, updateAdminDao} = require("../dao/adminDao");
const {ValidationError} = require("../utils/errors");
const {formatResponse} = require("../utils/tool");

// 登录
module.exports.loginService = async function(loginInfo){
    loginInfo.loginPwd = md5(loginInfo.loginPwd);
    let data = await loginDao(loginInfo);
    if(data && data.dataValues){
        // 构造返回数据结构
        data = {
            "id": data.dataValues.id,
            "loginId": data.dataValues.loginId,
            "loginName": data.dataValues.loginName
        };

        let loginPeriod = null;
        if(loginInfo.remember){
            loginPeriod = parseInt(loginInfo.remember);
        }else{
            // 默认 1天
            loginPeriod = 1;
        }
        // generate token
        const token = jwt.sign(data, md5(process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 * loginPeriod
        }));

        return {token, data}
    }else{
        return {data};
    }
}

// 更新
module.exports.updateAdminService = async function(accountInfo){
    // 根据传入的账号和旧密码去查找
    const adminInfo = await loginDao({
        "loginId": accountInfo.loginId,
        "loginPwd": md5(accountInfo.oldLoginPwd)
    });
    if(adminInfo && adminInfo.dataValues){
        let newPwd = md5(accountInfo.loginPwd);
        await updateAdminDao({
            "loginName": accountInfo.loginName,
            "loginId": accountInfo.loginId,
            "loginPwd": newPwd
        });
        return formatResponse(0, "", {
            "loginId": accountInfo.loginId,
            "loginName": accountInfo.loginName,
            "id": adminInfo.dataValues.id
        });
    }else{
        throw new ValidationError("旧密码不正确");
    }
}


