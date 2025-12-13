const blogModel = require("./model/blogModel");
const blogTypeModel = require("./model/blogTypeModel");


// 添加博客
module.exports.addBlogDao = async function(newBlogInfo){
    const {dataValues} = await blogModel.create(newBlogInfo);
    return dataValues;
}

// 根据id获取一篇博客
module.exports.getBlogByIdDao = async function(id){
    return await blogModel.findByPk(id, {
        include: [
            {
                model: blogTypeModel,
                as: "category"
            }
        ]
    })
}

// 修改博客
module.exports.updateBlogDao = async function(id, newBlogInfo){
    await blogModel.update(newBlogInfo, {
        where: {
            id
        }
    })
}

// 删除博客
module.exports.deleteBlogDao = async function(id){
    return await blogModel.destroy({
        where: {
            id
        }
    })
}

// 根据博客类别id, 统计对应博客类别下博客的数量
module.exports.blogCountByBlogTypeDao = async function(categoryId){
    return await blogModel.count({
        where: {
            categoryId
        }
    })
}

// 根据分页信息获取博客
module.exports.getBlogByPageDao = async function(pageInfo){
    if(pageInfo.categoryId && pageInfo.categoryId.categoryId != '-1'){
        return await blogModel.findAndCountAll({
            include: [
                {
                    model: blogTypeModel,
                    as: "category",
                    where: {
                        id: pageInfo.categoryId
                    }
                }
            ],
            offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
            limit: pageInfo.limit * 1
        })
    }else{
        await blogModel.findAndCountAll({
            include: [
                {
                    model: blogTypeModel,
                    as: "category"
                }
            ],
            offset: (pageInfo.page * 1 - 1) * pageInfo.limit,
            limit: pageInfo.limit * 1
        })
    }
}

