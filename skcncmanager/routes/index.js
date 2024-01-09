var express = require('express');
var router = express.Router();

const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'skcncmanagerdb'
});

connection.connect();
var dbtest
connection.query('SELECT * from project_table', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
  dbtest = rows;
});
connection.end();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express majun', dbtest: dbtest  });
});



module.exports = router;
