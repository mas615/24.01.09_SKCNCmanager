var express = require('express');
var router = express.Router();

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'skcncmanagerdb'
  });     

router.get('/', function(req, res, next) {
    console.log(req.query);
    connection.connect();
    connection.query('select * from penetrationtest where manage_code = "A000" order by testcount desc limit 1', (error, projectcode, fields) => {
    //console.log(projectcode[0]);
    body = `<table border='1'><th>취약점 No</th><th>취약점</th><th>내용</th><th>발생위치</th><th>최종점검일</th><th>점검회차</th><th>조치상태</th><th>조치담당자</th><th>조치내용</th><th>비고</th><tr>`;
    body += `<td><input></td>`;
    body += `</tr></table>`;
    body += ``;
    res.render('tmp', { title : "title", head : "head", body : body});
    });
    
});

module.exports = router;
