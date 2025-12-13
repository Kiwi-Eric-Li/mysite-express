var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { expressjwt: jwt } = require("express-jwt");
const md5 = require('md5');
const session = require("express-session");

const {ForbiddenError, ServiceError, UnknownError} = require("./utils/errors")

// 默认读取项目根目录下的.env
require("dotenv").config();
require("express-async-errors");
// 连接数据库
require("./dao/db");

// 引入路由
var adminRouter = require('./routes/admin');
var captchaRouter = require("./routes/captcha");
var bannerRouter = require("./routes/banner");
var blogTypeRouter = require("./routes/blogType");
var aboutRouter = require("./routes/about");
var projectRouter = require("./routes/project");
var settingRouter = require("./routes/setting");
var commentRouter = require("./routes/comment");


// 创建服务器实例
var app = express();

app.use(session({
  "secret": process.env.SESSION_SECRET,
  "resave": true,
  "saveUninitialized": true
}))

// 使用各种各样的中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置验证 token 接口
app.use(jwt({
  secret: md5(process.env.JWT_SECRET),
  algorithms: ["HS256"]
}).unless({
  // 不需要进行token验证的路由
  path: [
    {"url": "/api/admin/login", methods: ["POST"]},
    {"url": "/res/captcha", methods: ["GET"]},
    {"url": "/api/about", methods: ["GET"]},
    {"url": "/api/setting", methods: ["GET"]},
    {"url": "/api/comment", methods: ["GET", "POST"]},
    {"url": "/api/banner", methods: ["GET"]},
    {"url": "/api/blogtype", methods: ["GET"]},
    {"url": "/api/project", methods: ["GET"]}
  ]
}))


// 使用路由中间件
app.use('/api/admin', adminRouter);
app.use("/res/captcha", captchaRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/blogtype", blogTypeRouter);
app.use("/api/about", aboutRouter);
app.use("/api/project", projectRouter);
app.use("/api/setting", settingRouter);
app.use("/api/comment", commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if(err.name === "UnauthorizedError"){
    // 说明是token验证错误，我们抛出自定义异常
    res.send(new ForbiddenError("未登录，或者登录已经过期").toResponseJSON());
  }else if(err instanceof ServiceError){
    res.send(err.toResponseJSON());
  }else{
    res.send(new UnknownError().toResponseJSON());
  }
});

module.exports = app;
