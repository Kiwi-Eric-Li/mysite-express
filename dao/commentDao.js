const {Op} = require("sequelize");

const blogModel = require("./model/blogModel");
const commentModel = require("./model/commentModel");

module.exports.addCommentDao = async function(newMessage){
    const {dataValues} = await commentModel.create(newMessage);
    return dataValues;
}

// 根据评论id，删除评论
module.exports.deleteCommentDao = async function(id){
    return await commentModel.destroy({
        where: {
            id
        }
    })
}

// 根据博客id，删除评论
module.exports.deleteCommentByBlogIdDao = async function(blogId){
    return await commentModel.destroy({
        where: {
            blogId
        }
    })
}

// 分页获取留言或者评论
module.exports.getCommentsByPageDao = async function(pageInfo){
    // 根据blogId来区分
    if(pageInfo.blogId){
        return await commentModel.findAndCountAll({
            where: {
                blogId: pageInfo.blogId * 1
            },
            offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
            limit: pageInfo.limit * 1,
            order: [
                ["createDate", "DESC"]
            ]
        })
    }else{
        return await commentModel.findAndCountAll({
            where: {
                blog: null
            },
            offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
            limit: pageInfo.limit * 1,
            order: [
                ["createDate", "DESC"]
            ]
        })
    }
}




