const express = require('express')
const router = express.Router()

// 引入model 模块 
// const conn = require('./model.js')
const ctrl = require('./controller.js')

// 获取所有未删除的英雄的列表
router.get('/api/getheros', ctrl.getheros)

//根据Id更新英雄数据
router.post('/api/updatehero', ctrl.updatehero)

// 根据ID获取英雄
router.get('/api/gethero', ctrl.gethero)

// 根据ID删除英雄
router.get('/api/delhero', ctrl.delhero)

// 添加英雄
router.post('/api/addhero', ctrl.addhero)

module.exports = router 