// 服务器端项目的入口文件
const express = require('express')
const app = express()
// const moment = require('moment')


// 导入CORS 模块
const cors = require('cors')
app.use(cors())


// 注册 解析表单的 body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))


// 引入 model.js 模块
// const conn = require('./model.js');

// 引入路由
const router = require('./router.js');
// 注册路由
app.use(router)


app.listen(5000, function () {
  console.log('Data server running at http://127.0.0.1:5000');
});



// 梳理思路：
// 1. 创建一个最基本的express服务器， 作用：不提供web服务器，而是提供 一个 数据接口服务
// 2. 安装 cors 模块，从而启用跨域资源共享
// 3. 安装 mysql 模块，操作数据库
// 4. 根据 API 设计文档，来 创建对应的接口API，在接口API中，如果要返回JSON数据，使用 res.json()
// 5. 在设计 更新英雄的时候，需要安装 body-parser 中间件，来解析表单数据了；