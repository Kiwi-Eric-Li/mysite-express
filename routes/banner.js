var express = require("express");
var router = express.Router();

const {findBannerService, updateBannerService} = require("../service/bannerService");

router.get("/", async function(req, res, next){
    res.send(await findBannerService());
});

router.post("/", async function(req, res, next){
    res.send();
})

module.exports = router;