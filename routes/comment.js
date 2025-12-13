var express = require("express");
var router = express.Router();

const {getCommentsByPageService, deleteCommentService, addCommentService} = require("../service/commentService");

router.post("/", async function(req, res, next){
    res.send(await addCommentService(req.body));
})

router.get("/", async function(req, res, next){
    res.send(await getCommentsByPageService(req.query));
})

router.delete("/:id", async function(req, res, next){
    res.send(await deleteCommentService(req.params.id));
})

module.exports = router;

