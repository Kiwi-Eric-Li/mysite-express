const {validate} = require("validate.js");

const {addBlogDao, getBlogByIdDao, updateBlogDao, deleteBlogDao, blogCountByBlogTypeDao, getBlogByPageDao} = require("../dao/blogDao");
const {addBlogTypeDao, getOneBlogTypeDao} = require("../dao/blogTypeDao");
const {deleteCommentByBlogIdDao} = require("../dao/commentDao");
const blogTypeModel = require("../dao/model/blogTypeModel");
const {ValidationError} = require("../utils/errors");
const {formatResponse, handleDataPattern, handleTOC} = require("../utils/tool");

// 扩展验证规则
validate.validators.categoryIdIsExist = async function(value){
    const blogTypeInfo = blogTypeModel.findByPk(value);
    if(blogTypeInfo){
        return;
    }
    return "CategoryId is not exist."
}

// 删除一篇博客
module.exports.deleteBlogService = async function(id){
    // 根据id找到这篇博客
    const data = await getBlogByIdDao(id);
    const categoryInfo = await getOneBlogTypeDao(data.dataValues.categoryId)
    categoryInfo.articleCount--;
    await categoryInfo.save();
    // 还需要删除该博客下的所有评论
    await deleteCommentByBlogIdDao(id);
    // 最后，删除博客
    await deleteBlogDao(id);
    return formatResponse(0, "", true);
}

// 添加博客
module.exports.addBlogService = async function(newBlogInfo){
    // 首先处理TOC
    newBlogInfo = handleTOC(newBlogInfo);
    // 接下来，将处理好的TOC转为字符串
    newBlogInfo.toc = JSON.stringify(newBlogInfo.toc);
    // 初始化文章其他信息
    newBlogInfo.scanNumber = 0;
    newBlogInfo.commentNumber = 0;

    // define validation rule
    const blogRule = {
        title: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        description: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        toc: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        htmlContent: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        thumb: {
            presence: {
                allowEmpty: true
            },
            type: "string"
        },
        scanNumber: {
            presence: {
                allowEmpty: false
            },
            type: "integer"
        },
        commentNumber: {
            presence: {
                allowEmpty: false
            },
            type: "integer"
        },
        createDate: {
            presence: {
                allowEmpty: false
            },
            type: "integer"
        },
        categoryId: {
            presence: true,
            type: "integer",
            categoryIdIsExist: true
        }
    }

    try{
        await validate.async(newBlogInfo, blogRule);
        const data = await addBlogDao(newBlogInfo);
        await addBlogTypeDao(newBlogInfo.categoryId);
        return formatResponse(0, "", data);
    }catch(e){
        throw new ValidationError("数据验证失败");
    }

}

// 修改博客
module.exports.updateBlogService = async function(id, newBlogInfo){
    // 首先，判断正文内容有没有变化，因为正文内容的改变会影响TOC
    if(newBlogInfo.htmlContent){
        newBlogInfo = handleTOC(newBlogInfo);
        newBlogInfo.toc = JSON.stringify(newBlogInfo.toc);
    }

    // 新的文章分类对应的文章数量要自增
    const {dataValues: oldBlogInfo} = await getBlogByIdDao(id);
    if(newBlogInfo.categoryId != oldBlogInfo.categoryId){
        // 旧的自减
        const oldBlogType = await getOneBlogTypeDao(oldBlogInfo.categoryId);
        oldBlogType.articleCount--;
        await oldBlogType.save();

        // 新的自增
        const newBlogType = await getOneBlogTypeDao(newBlogInfo.categoryId);
        newBlogType.articleCount++;
        await newBlogType.save();
    }
    const {dataValues} = await updateBlogDao(id, newBlogInfo);
    return formatResponse(0, "", dataValues);
}

// 根据id获取一篇博客
module.exports.getBlogByIdService = async function(id){
    const data = await getBlogByIdDao(id);
    data.dataValues.toc = JSON.parse(data.dataValues.toc);
    return formatResponse(0, "", data.dataValues);
}

// 根据分页获取博客
module.exports.getBlogByPageService = async function(pageInfo){
    const data = await getBlogByPageDao(pageInfo);
    const rows = handleDataPattern(data.rows);
    rows.forEach(item => {
        item.toc = JSON.parse(item.toc);
    });
    return formatResponse(0, "", {
        "total": data.count,
        "rows": rows
    })
}



