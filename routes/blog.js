var express = require("express");
var router = express.Router();

const {addBlogService, getBlogByIdService, getBlogByPageService, updateBlogService, deleteBlogService} = require("../service/blogService");


router.post("/", async function(req, res, next){
    res.send(await addBlogService(req.body));
})

router.get("/", async function(req, res, next){
    res.send(await getBlogByPageService(req.query));
})

router.get("/:id", async function(req, res, next){
    res.send(await getBlogByIdService(req.params.id));
})

router.put("/:id", async function(req, res, next){
    res.send(await updateBlogService(req.params.id, req.body));
})

router.delete("/:id", async function(req, res, next){
    res.send(await deleteBlogService(req.params.id));
})

module.exports = router;