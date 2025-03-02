const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
  timezone: process.env.MYSQL_TIMEZONE,
});

async function execute(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

async function queryMultiple(sqlList, params) {
  const conn = await pool.getConnection();

  const result = [];

  for (let i = 0; i < sqlList.length; i++) {
    const [element] = await conn.query(sqlList[i], params);
    result.push(element);
  }

  conn.release();
  return result;
}

module.exports = {
  execute,
  queryMultiple,
};
