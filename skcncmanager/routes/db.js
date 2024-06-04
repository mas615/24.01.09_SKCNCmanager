var mysql = require("mysql2");
// const db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'skcncmanagerdb'
//   }); 
// module.exports = db;
// 이전 코드

const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'skcncmanagerdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function query(sql, values, callback) {
  pool.query(sql, values, (error, results, fields) => {
    if (error) return callback(error);
    callback(null, results, fields);
  });
}

module.exports = { query };
