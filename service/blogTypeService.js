const {validate} = require("validate.js")

const {getAllBlogTypeDao, getOneBlogTypeDao, addBlogTypeDao, updateBlogTypeDao, deleteBlogTypeDao} = require("../dao/blogTypeDao");
const {ValidationError} = require("../utils/errors");
const {formatResponse, handleDataPattern} = require("../utils/tool")

// 获取所有博客类型
module.exports.getAllBlogTypeService = async function(){
    const data = await getAllBlogTypeDao();
    const result = formatResponse(0, "", handleDataPattern(data));
    result.data.sort((a, b) => a.order - b.order);
    return result;
}

// 根据id，获取一条博客类型
module.exports.getOneBlogTypeService = async function(id){
    const data = await getOneBlogTypeDao(id);
    return formatResponse(0, "", data);
}

// 添加博客类型
module.exports.addBlogTypeService = async function(blogType){
    // 首先 进行数据验证
    // define validated rule
    const blogTypeRule = {
        title: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        order: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        }
    }
    // validate data
    const validateResult = validate.validate(blogType, blogTypeRule);
    if(!validateResult){
        blogType.articleCount = 0;  // 该类型下的文章数量初始化为0
        const data = await addBlogTypeDao(blogType);
        return formatResponse(0, "", data);
    }else{
        throw new ValidationError("数据验证失败");
    }
}

// 修改博客类型
module.exports.updateBlogTypeService = async function(id, blogType){
    const result = await updateBlogTypeDao(id, blogType);
    return formatResponse(0, "", result);
}

// 删除博客类型
module.exports.deleteBlogTypeService = async function(id){
    await deleteBlogTypeDao(id);
    return formatResponse(0, "", null);
}


