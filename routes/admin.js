var express = require("express");
var router = express.Router();

const {loginService} = require("../service/adminService")
const {ValidationError} = require("../utils/errors")
const {formatResponse} = require("../utils/tool")


router.post("/login", async function(req, res, next){
    // 验证 验证码是否正确
    if(req.body.captcha.toLowerCase() !== req.session.captcha.toLowerCase()){
        throw new ValidationError("验证码错误");
    }

    const result = await loginService(req.body);
    if(result.token){
        res.setHeader("authentication", result.token);
    }
    res.send(formatResponse(0, "", res.data));
});

// 恢复登录状态
router.get("/whoami", async function(req, res, next){
    
})

module.exports = router;