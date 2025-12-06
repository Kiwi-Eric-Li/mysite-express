var express = require("express");
var router = express.Router();

var {getAboutService, updateAboutService} = require("../service/aboutService");

router.get("/", async function(req, res, next){
    res.send(await getAboutService());
});

router.post("/", async function(req, res, next){
    res.send(await updateAboutService(req.body.url));
});

module.exports = router;