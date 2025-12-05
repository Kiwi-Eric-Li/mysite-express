const blogTypeModel = require("./model/blogTypeModel");

// 获取所有博客类型
module.exports.getAllBlogTypeDao = async function(){
    return await blogTypeModel.findAll();
}

// 根据id，获取一条博客类型
module.exports.getOneBlogTypeDao = async function(id){
    const {dataValues} = await blogTypeModel.findByPk(id);
    return dataValues;
}

// 添加博客类型
module.exports.addBlogTypeDao = async function(newBlogType){
    const {dataValues} = await blogTypeModel.create(newBlogType);
    return dataValues;
}

// 修改博客类型
module.exports.updateBlogTypeDao = async function(id, blogType){
    await blogTypeModel.update(blogType, {
        where: {
            id
        }
    });
    const {dataValues} = await blogTypeModel.findByPk(id);
    return dataValues;
}

// 删除博客类型
module.exports.deleteBlogTypeDao = async function(id){
    return await blogTypeModel.destroy({
        where: {
            id
        }
    })
}





