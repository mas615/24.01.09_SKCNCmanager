// var mysql = require("mysql2");
// // const db = mysql.createConnection({
// //     host     : 'localhost',
// //     user     : 'root',
// //     password : 'root',
// //     database : 'skcncmanagerdb'
// //   }); 
// // module.exports = db;
// // 이전 코드

// const pool = mysql.createPool({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'skcncmanagerdb',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// function query(sql, values, callback) {
//   pool.query(sql, values, (error, results, fields) => {
//     if (error) return callback(error);
//     callback(null, results, fields);
//   });
// }

// module.exports = { query };

var mysql = require("mysql2");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'skcncmanagerdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000  // 10초
});

setInterval(() => {
  pool.query('SELECT 1', (error, results) => {
    if (error) {
      console.error('Error performing keep-alive query:', error);
    } else {
      console.log('Keep-alive query executed');
    }
  });
}, 10800000); // 3시간 마다 실행

function query(sql, values, callback) {
  pool.query(sql, values, (error, results, fields) => {
    if (error) {
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
      } else if (error.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.');
      } else if (error.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.');
      }
      return callback(error);
    }
    callback(null, results, fields);
  });
}

module.exports = { query };
