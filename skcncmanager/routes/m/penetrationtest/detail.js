var express = require('express');
var router = express.Router();
const mysql = require('mysql2');


router.get('/', function(req, res, next) {
    console.log("abd",req.query.code);
    var title = "디테일"
    var head = "헤드"
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'skcncmanagerdb'
      });      
    connection.connect();
    sql = 'select testcount, status, url, urlcount, pentester, manday, DATE_FORMAT(startdate,"%y-%m-%d"), DATE_FORMAT(enddate,"%y-%m-%d"), DATE_FORMAT(actdate,"%y-%m-%d"), memo from penetrationtest inner join project_table on penetrationtest.manage_code = project_table.manage_code where penetrationtest.manage_code = ? order by penetrationtest.seq desc';
    var values = [];
    values.push(req.query.code);
    
    connection.query(sql, values, (error, rows, fields) => {
      console.log(new Date());
        var body = `<br><table border='1'><th bgcolor="#D9E5FF">점검회차</th><th bgcolor="#D9E5FF">진행상태</th><th bgcolor="#D9E5FF">URL or IP</th><th bgcolor="#D9E5FF">URL 수</th><th bgcolor="#D9E5FF">진단자</th><th bgcolor="#D9E5FF">진단공수</th><th bgcolor="#D9E5FF">진단 시작일</th><th bgcolor="#D9E5FF">진단 종료일</th><th bgcolor="#D9E5FF">조치 예정일</th><th bgcolor="#D9E5FF">비고</th>
        `;
        for(const key of rows){
            body += "<tr>";
                for(const key2 in key){
                    if (key2 == "status"){
                      if (key[key2] == '1'){
                        body += "<td>1. 최초진단</td>";
                      }else if(key[key2] == '2'){
                        body += "<td>2. 이행점검</td>";
                      }else if(key[key2] == '3'){
                        body += "<td>3. 조치완료</td>";
                      }else{
                        body += "<td>코드오류</td>";
                      };
                    }else{
                      body += "<td>"+key[key2]+"</td>";
                    }
                }
            body += "</tr>";
        }
        body += "</table>";


        res.render('tmp', { title : title, head : "", body : body});
        connection.end();
    });
  });

module.exports = router;