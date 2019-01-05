
//创建数据库连接对象
const mysql = require('mysql')

module.exports = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'mydb_12_9'
})


