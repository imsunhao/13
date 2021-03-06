/*****************************************************************************/
/*
 /* 开发开始时间 2017-7-8 16:58:49   author:imsunhao
 /*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用文件系统模块
 /*     功能                       文件系统            核心
 /*
 */
const fs = require('fs')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 引入文件系统-路径模块
 /*     功能            被           所有文件系统            依赖
 /*
 */
const path = require('path')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* TODO 启用express框架
 /*     功能            核心框架
 /*     功能            引入父系统
 /*     功能            引入子系统
 /*
 */
const express = require('express')
const app = express()

/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用文件系统-读取模块
 /*     功能            被           文件系统-记录log            依赖
 /*
 */
const FileStreamRotator = require('file-stream-rotator')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* TODO 启用文件系统-记录log
 /*     功能            记录访问服务器日志
 /*     网址：     https://github.com/expressjs/morgan
 */
const logger = require('morgan')

const logDirectory = path.join(__dirname, 'log')         //日志系统路径
const accessLogStream = FileStreamRotator.getStream({
  date_format: 'YYYYMMDD',
  filename: path.join(logDirectory, 'imSunHao-%DATE%.log'),
  frequency: 'daily',
  verbose: false
})
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站功能-图标
 /*     功能            统一调配图标
 /*     网址：
 */
const favicon = require('serve-favicon')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站请求分析系统-session
 /*     功能            解析与生成    请求中    session
 /*     网址：
 */
const session = require('express-session')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站请求分析系统-cookie
 /*     功能            解析与生成    请求中    cookie
 /*     网址：
 */
const cookieParser = require('cookie-parser')
/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 启用网站请求分析系统-require
 /*     功能            解析    请求中     所有的参数
 /*     网址：
 */
const bodyParser = require('body-parser')
/*
 /*****************************************************************************/

app.use(express.static(path.join(__dirname, 'public')))           //加载public资源

/*****************************************************************************/
/*
 /* 启用 路由适配
 /*     功能           见注释
 /*
 */

// TODO wms 4.0 端口转发
// 一旦切换为 真实端口 便没有通知层

const proxyMiddleware = require('http-proxy-middleware')

app.use(proxyMiddleware('/WebServices/WbsShenYang.asmx', {
  target: 'http://127.0.0.1:5306/',
  secure: false,
  changeOrigin: true
}))
app.use(proxyMiddleware('/WebServices/WbsJiNan.asmx', {
  target: 'http://127.0.0.1:5555/',
  secure: false,
  changeOrigin: true
}))

// error handler analysis
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  console.log(req.originalUrl)
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development

  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  // res.status(err.status || 500);
  console.log(err)
})

/*
 /*****************************************************************************/

/*****************************************************************************/
/*
 /* 导出 服务
 /*
 */
module.exports = app
/*
 /*****************************************************************************/


