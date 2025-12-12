const md5 = require("md5");

const sequelize = require("./dbConnect");
const adminModel = require("./model/adminModel");
const bannerModel = require("./model/bannerModel");
const blogTypeModel = require("./model/blogTypeModel");
const aboutModel = require("./model/aboutModel");
const settingModel = require("./model/settingModel");
const blogModel = require("./model/blogModel");
const commentModel = require("./model/commentModel")

(async function(){

    // 博客和博客类型之间的关系
    blogTypeModel.hasMany(blogModel, {foreignKey: 'categoryId', targetKey: "id"});
    blogModel.belongsTo(blogTypeModel, {foreignKey: 'categoryId', targetKey: "id", as: "category"});

    // 博客和博客评论之间的关系
    blogModel.hasMany(commentModel, {foreignKey: 'blogId', target: "id"});
    commentModel.belongsTo(blogModel, {foreignKey: "blogId", target: "id", as: "blog"});



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


    // initialize banner data
    const bannerCount = await bannerModel.count();
    if(!bannerCount){
        await bannerModel.bulkCreate([{
            "midImg": "/static/images/bg1_mid.jpg",
            "bigImg": "/static/images/bg1_big.jpg",
            "title": "塞尔达旷野之息",
            "description": "2017年年度游戏，期待续作"
        }, {
            "midImg": "/static/images/bg2_mid.jpg",
            "bigImg": "/static/images/bg2_big.jpg",
            "title": "赛尔达四英杰",
            "description": "四英杰里面你最喜欢的又是谁呐"
        }, {
            "midImg": "/static/images/bg3_mid.jpg",
            "bigImg": "/static/images/bg3_big.jpg",
            "title": "日本街道",
            "description": "动漫中经常出现的日本农村街道，一份独特的恬静"
        }]);
        console.log("初始化banner数据完毕...")
    }

    // initialize about data
    const aboutCount = await aboutModel.count();
    if(!aboutCount){
        await aboutModel.create({
            url: "https://github.com/Kiwi-Eric-Li"
        });
        console.log("初始化关于我们数据...");
    }

    const settingCount = await settingModel.count();
    if(!settingCount){
        await settingModel.create({
            avatar: "/static/images/avatar.jpeg",
            siteTitle: "我的个人空间",
            github: "https://github.com/Kiwi-Eric-Li",
            qq: "3266503313",
            qqQrCode: "",
            weixin: 'yundanfengqing',
            weixinQrCode: "",
            mail: "lixf3626@gmail.com",
            icp: "",
            githubName: "Kiwi-Eric-Li",
            favicon: ""
        });
        console.log("初始化全局设置数据...")
    }





    console.log("数据库数据已经准备完毕...");
})();