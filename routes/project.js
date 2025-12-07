var express = require("express");
var router = express.Router();

const {addProjectService, getAllProjectService, updateProjectService, deleteProjectService} = require("../service/projectService");

router.get("/", async function(req, res, next){
    res.send(await getAllProjectService());
})

router.post("/", async function(req, res, next){
    res.send(await addProjectService(req.body));
})

router.put("/", async function(req, res, next){
    res.send(await updateProjectService(req.params.id, req.body));
})

router.delete("/", async function(req, res, next){
    res.send(await deleteProjectService(req.params.id));
})


module.exports = router
