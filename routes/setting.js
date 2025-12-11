var express = require("express");
var router = express.Router();

const {getSettingService, updateSettingService} = require("../service/settingService");

router.get("/", async function(req, res, next){
    res.send(await getSettingService());
});

router.put("/", async function(req, res, next){
    res.send(await updateSettingService(req.body));
})

module.exports = router;