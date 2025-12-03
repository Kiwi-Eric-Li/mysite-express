var express = require("express");
var router = express.Router();

const {loginService} = require("../service/adminService")
const {ValidationError} = require("../utils/errors")
const {formatResponse, analysisToken} = require("../utils/tool")


router.post("/login", async function(req, res, next){
    console.log("login, req.body", req.body);
    console.log("session.captcha=", req.session.captcha)
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
    // 从客户端请求中获取到token，然后再解析它，还原有用的信息
    const token = analysisToken(req.get("Authorization"));
    res.send(formatResponse(0, "", {
        "loginId": token.loginId,
        "loginName": token.loginName,
        "id": token.id
    }));
});

router.put("/", async function(req, res, next){
    res.send()
})

module.exports = router;