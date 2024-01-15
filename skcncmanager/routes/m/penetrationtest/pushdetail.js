var express = require('express');
var router = express.Router();
//db 연결
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'skcncmanagerdb'
  });
connection.connect();
//db연결 끝 connection.connect(); 로 연결

router.get('/', function(req, res, next) {
    console.log("파라미터값 : ",req.query.code);
    var title = "타이틀"
    var head = "헤드"
    var body = ""
    //connection.connect();
    sql = 'select testcount, url, urlcount, pentester, status, manday, DATE_FORMAT(startdate,"%y-%m-%d"), DATE_FORMAT(enddate,"%y-%m-%d"), DATE_FORMAT(actdate,"%y-%m-%d"), memo from penetrationtest inner join project_table on penetrationtest.manage_code = project_table.manage_code where penetrationtest.manage_code = ? order by penetrationtest.seq desc limit 1';
    var values = [];
    values.push(req.query.code);
    connection.query(sql, values, (error, rows, fields) => {
        body += "<table border='1'>";
        titles = ["점검회차","URL or IP","URL수","진단자"];        
        for(const titleskey of titles){
            body += `<th bgcolor="#D9E5FF">${titleskey}</th>`;
            
        };
        titles = ["진행상태","진단공수","진단 시작일","진단 종료일","조치 예정일","비고","저장"];        
        for(const titleskey of titles){
            body += `<th>${titleskey}</th>`;
            
        };
        body += `<tr><form action="./pushdetail" method='post'><input type='hidden' name='code' value='${req.query.code}'>`;
        var name = 0;
        var now_date = `<script>`;
        for(const rowskey in rows[0]){
            console.log(rowskey);
            if(rowskey == "testcount"){
                body += `<td bgcolor="#D9E5FF">${rows[0][rowskey]+1}</td><input type="hidden" name="${name}" value="${rows[0][rowskey]+1}">`;
                name += 1;
            }else if(rowskey=='status'){
                body += `<td><select name='${name}'><option value='2'>2. 이행점검</option><option value='3'>3. 점검완료</option></select></td>`;
                name += 1;
            }else if(rowskey=='DATE_FORMAT(startdate,"%y-%m-%d")' || rowskey=='DATE_FORMAT(enddate,"%y-%m-%d")'){
                body += `<td><input type='date' name='${name}' id='now_date${name}'></td>`;
                now_date +=`document.getElementById('now_date${name}').valueAsDate = new Date();`;
                name += 1;
            }else if(rowskey=='DATE_FORMAT(actdate,"%y-%m-%d")'){
                body += `<td><input type='date' name='${name}'></td>`;
                name += 1;
            }else if(rowskey=="url" || rowskey=="memo"){
                body += `<td><textarea name="${name}">${rows[0][rowskey]}</textarea></td>`;
                name += 1;
            }else if(rowskey=="manday"){
                body += `<td><input type="number" name="${name}" value="1" size="5"></td>`;
                name += 1;
            }else{
                body += `<td><input type="text" name="${name}" value="${rows[0][rowskey]}" size="5"></td>`;
                name += 1;
            }; 
            
        };
        body += `<td><input type='submit'></form></td></tr></table>${now_date}</script>`;
        res.render('tmp', { title : title, head : head, body : body});
    });    
});

router.post('/', (req, res, next) => {  
    //connection.connect();
    var sql = "INSERT INTO penetrationtest (testcount, url, urlcount, pentester, status, manday, startdate, enddate, actdate, memo, manage_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var values = []
    console.log(req.body);
    //받은 파라미터를 values에 추가
    for (const key in req.body){
      if(req.body[key]==''){
        values.push(null);
      }else{
        values.push(req.body[key]);
      };        
    };
    //쿼리 실행
    connection.query(sql,values,function(err, rows, fields) {
      if (err){
        console.log(err);
      }
      else{
        console.log(rows.insertId);
      }
    });
    302
    res.redirect(302, `/m/penetrationtest/detail?code=${req.body.code}`);
    //connection.end();
  });

module.exports = router;
