var express = require("express");
var router = express.Router();

const {findBannerService, updateBannerService} = require("../service/bannerService");

// 获取 banner
router.get("/", async function(req, res, next){
    res.send(await findBannerService());
});

// 设置 banner
router.post("/", async function(req, res, next){
    res.send(await updateBannerService(req.body));
})

module.exports = router;