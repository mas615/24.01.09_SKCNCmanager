var express = require('express');
var router = express.Router();

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'skcncmanagerdb'
  });
connection.connect();

router.post('/', function(req, res, next) { 
    body='';    
    sql = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, memo, vulnerspot, lastdate, status, vulnermanager, vulnernote, vulnermemo) VALUES (?,?,?,?,?,?,?,?,?,?)';
    sql2 = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, memo, vulnerspot, lastdate, status, vulnermanager, vulnernote, vulnermemo) VALUES (?,?,?,?,?,?,?,?,?,?)';
    values = [];
    for(const bodykey in req.body){
      values.push(req.body[bodykey]);
    }
    console.log('testcount : ',req.body[2]);
    if(req.body[2] !== '0'){
      console.log('if로 갔을경우.');
      connection.query(sql,values, (err, rows, fields) => {
        if (err){
          console.log(err);
        }
        else{
          console.log(rows.insertId);
        };
        values[1] = 0; 
        connection.query(sql2,values, (err, rows, fields) => {
          if (err){
            console.log(err);
          }
          else{
            console.log(rows.insertId);
          }
          res.redirect(302, `/m/penetrationtest/detail?code=${req.body[1]}&testcount=${req.body[2]}`);
        });
      });
    }else{
      console.log('else로 갔을경우.');
      connection.query(sql,values, (err, rows, fields) => {
        if (err){
          console.log(err);
        }
        else{
          console.log(rows.insertId);
        }
        res.redirect(302, `/m/penetrationtest/detail?code=${req.body[1]}&testcount=${req.body[2]}`);
      });      
    };    
});

module.exports = router;
