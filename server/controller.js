const conn = require('./model.js')
const moment = require('moment')

/**
 * 获取所有的英雄
 * @param {*} req 
 * @param {*} res 
 */
const getheros = (req, res) => {
  // 定义Sql语句
  const sqlStr = 'select * from heros where isdel=0 order by id asc'
  conn.query(sqlStr, (err, results) => {
    console.log(results)
    if (err) return res.json({ err_code: 1, message: '获取数据失败', affectedRows: 0 })
    res.json({ err_code: 0, message: results, affectedRows: 0 })
  })
}

/**
 * 更新英雄
 * @param {*} req 
 * @param {*} res 
 */
const updatehero = (req, res) => {
  // 如何拿到 post 提交过来的数据？
  const sqlStr = 'update heros set ? where id=?'
  conn.query(sqlStr, [req.body, req.body.id], (err, results) => {
    // 更新失败
    if (err) return res.json({ err_code: 1, message: '更新英雄失败！', affectedRows: 0 })
    // 影响行数不等于1
    if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '更新的英雄不存在！', affectedRows: 0 })

    res.json({ err_code: 0, message: '更新成功！', affectedRows: results.affectedRows })
  })
}

/**
 * 根据id获取英雄
 * @param {*} req 
 * @param {*} res 
 */
const gethero = (req, res) => {
  const id = req.query.id
  const sqlStr = 'select * from heros where id=?'
  conn.query(sqlStr, id, (err, results) => {
    // 执行Sql语句失败
    if (err) return res.json({ err_code: 1, message: '获取英雄失败', affectedRows: 0 })
    if (results.length !== 1) return res.json({ err_code: 1, message: '英雄不存在！', affectedRows: 0 })
    res.json({
      err_code: 0,
      message: results[0],
      affectedRows: 0
    })
  })
}

/**
 * 删除英雄
 * @param {*} req 
 * @param {*} res 
 */
const delhero = (req, res) => {
  const id = req.query.id
  const sqlStr = 'update heros set isdel=1 where id=?'
  conn.query(sqlStr, id, (err, results) => {
    if (err) return res.json({ err_code: 1, message: '删除英雄失败！', affectedRows: 0 })
    if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '删除英雄失败！', affectedRows: 0 })
    res.json({ err_code: 0, message: '删除英雄成功！', affectedRows: results.affectedRows })
  })
}

/**
 * 添加英雄
 * @param {*} req 
 * @param {*} res 
 */
const addhero = (req, res) => {
  const hero = req.body
  // 补全英雄的创建时间
  hero.ctime = moment().format('YYYY-MM-DD HH:mm:ss')

  const sqlStr = 'insert into heros set ?'
  conn.query(sqlStr, hero, (err, results) => {
    if (err) return res.json({ err_code: 1, message: '添加失败！', affectedRows: 0 })
    if (results.affectedRows !== 1) return res.json({ err_code: 1, message: '添加失败！', affectedRows: 0 })
    res.json({ err_code: 0, message: '添加成功', affectedRows: results.affectedRows })
  })
}

module.exports = {
  getheros,
  updatehero,
  gethero,
  delhero,
  addhero
}