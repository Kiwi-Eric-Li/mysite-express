const {validate} = require("validate.js");
const fs = require("fs");

const {addCommentDao, deleteCommentDao, deleteCommentByBlogIdDao, getCommentsByPageDao} = require("../dao/commentDao");
const {getBlogByIdDao} = require("../dao/blogDao");
const {formatResponse, handleDataPattern} = require("../utils/tool");
const {ValidationError, UnknownError} = require("../utils/errors");
const dir = "./public/static/avatar";

// 读取一个目录下有多少文件
async function readDirLength(dir){
    return new Promise((resolve) => {
        fs.readdir(dir, (err, files) => {
            if(err) throw new UnknownError();
            resolve(files);
        })
    })
}

// 分页获取评论，获取留言
module.exports.getCommentsByPageService = async function(pageInfo){
    const data = await getCommentsByPageDao(pageInfo);
    const rows = handleDataPattern(data.rows);
    return formatResponse(0, "", {
        "total": data.count,
        "rows": rows
    })
}

// 删除留言或评论
module.exports.deleteCommentService = async function(id){
    await deleteCommentDao(id);
    return formatResponse(0, "", true);
}

// 新增评论或留言
module.exports.addCommentService = async function(newComment){
    // data validation rule
    const commentRule = {
        nickname: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        content: {
            presence: {
                allowEmpty: false
            },
            type: "string"
        },
        blogId: {
            type: "string"
        }
    }

    // 进行数据验证
    const validateResult = validate.validate(newComment, commentRule);
    if(!validateResult){
        newComment.blogId = newComment.blogId ? newComment.blogId : null;
        newComment.createDate = Date.now();
        const files = await readDirLength(dir);
        // 随机选择一个文件
        const randomIndex = Math.floor(Math.random() * files.length);
        newComment.avatar = "/static/avatar/" + files[randomIndex];
        // 执行新增
        const data = await addCommentDao(newComment);
        // 如果是文章的评论，那么对应文章的评论数量要自增
        if(newComment.blogId){
            const blogData = await getBlogByIdDao(newComment.blogId);
            blogData.commentNumber++;
            await blogData.save();
        }
        return formatResponse(0, "", data);
    }else{
        throw new ValidationError("数据验证失败");
    }
}



