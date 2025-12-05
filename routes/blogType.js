var express = require("express");
var router = express.Router();

var {getAllBlogTypeService, getOneBlogTypeService, addBlogTypeService,  
     updateBlogTypeService, deleteBlogTypeService} = require("../service/blogTypeService");

// 获取 博客分类
router.get("/", async function(req, res, next){
    res.send(await getAllBlogTypeService());
});

// 根据id 获取一条博客分类
router.get("/:id", async function(req, res, next){
    res.send(await getOneBlogTypeService(req.params.id));
});

// 添加博客分类
router.post("/", async function(req, res, next){
    res.send(await addBlogTypeService(req.body));
});

// 修改博客分类
router.put("/:id", async function(req, res, next){
    res.send(await updateBlogTypeService(req.params.id, req.body));
});

// 删除一个博客分类
router.delete("/:id", async function(req, res, next){
    res.send(await deleteBlogTypeService(req.params.id));
});

module.exports = router;