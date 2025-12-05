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





