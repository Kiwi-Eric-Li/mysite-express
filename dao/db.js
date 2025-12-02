const md5 = require("md5");

const sequelize = require("./dbConnect");
const adminModel = require("./model/adminModel");

(async function(){
    // 将数据模型和表进行同步
    await sequelize.sync({
        alter: true
    })
    // 初始化数据
    const adminCount = await adminModel.count();
    if(!adminCount){
        await adminModel.create({
            "loginId": "admin",
            "loginName": "超级管理员",
            "loginPwd": md5("123456")
        })
        console.log("初始化管理员数据完毕...")
    }
    console.log("数据库数据已经准备完毕...")
})();