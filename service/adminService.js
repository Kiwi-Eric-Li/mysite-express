// admin 模块的业务逻辑层
const md5 = require("md5");
const jwt = require("jsonwebtoken");

const {loginDao} = require("../dao/adminDao");

module.exports.loginService = async function(loginInfo){
    loginInfo.loginPwd = md5(loginInfo.loginPwd);
    let data = await loginDao(loginInfo);
    if(data && data.dataValues){
        // add token
        data = {
            "id": data.dataValues.id,
            "loginId": data.dataValues.loginId,
            "loginName": data.dataValues.loginName
        };
        return {data}
    }
}