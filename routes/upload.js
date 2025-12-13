var express = require("express");
var router = express.Router();
const multer = require("multer");

const {UploadError} = require("../utils/errors");
const {uploading, formatResponse} = require("../utils/tool");

// 上传文件
router.post("/", async function(req, res, next){
    uploading.single("file")(req, res, function(err){
        if(err instanceof multer.MulterError){
            next(new UploadError("上传文件失败，请检查文件的大小，控制在2MB之内"))
        }else{
            const path = "/static/uploads/" + req.file.filename;
            res.send(formatResponse(0, "", path));
        }
    })
})

module.exports = router;




