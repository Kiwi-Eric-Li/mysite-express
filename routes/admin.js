var express = require("express");
var router = express.Router();

const {loginService} = require("../service/adminService")

router.post("/login", async function(req, res, next){
    
    const result = await loginService(req.body);
    if(result.token){
        res.setHeader("authentication", result.token);
    }
    res.send()
});

module.exports = router;