var express = require('express');
var router = express.Router();
const mysql = require('mysql2');

router.get('/', function(req, res, next) {
    var title = "모의해킹종합"
    var head = "헤드"
    var body = "바디"
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'skcncmanagerdb'
      });      
    connection.connect();
    connection.query('select manage_code, project_name from project_table order by manage_code', (error, projectcode, fields) => {
        console.log(projectcode);
        var select 
        for(const projectcodekey of projectcode){
            console.log(projectcodekey.manage_code);
            select += `<option value="${projectcodekey.manage_code}">[${projectcodekey.manage_code}] : ${projectcodekey.project_name}</option>`
        };
    connection.query('select project_name, old_inspectiontype, penetrationtest.manage_code, status, url, urlcount, pentester, testcount, manday, DATE_FORMAT(startdate,"%y-%m-%d"), DATE_FORMAT(enddate,"%y-%m-%d"), DATE_FORMAT(actdate,"%y-%m-%d"), memo from penetrationtest inner join project_table on penetrationtest.manage_code = project_table.manage_code order by penetrationtest.seq desc', (error, rows, fields) => {
        var body = `
        <form action="/m/penetrationtest" method="post">
        <table border='1'>

        <tr><td>진단대상관리코드</td><td>
        <select name="1">
               ${select}
        </select>
        </td></tr>
        <tr><td>진행상태</td><td>
        <select name='2'>
          <option value='1'>1. 최초진단</option>
          <option value='2'>2. 이행점검</option>
          <option value='3'>3. 조치완료</option>
        </select>
        </td></tr>
        <tr><td>URL</td><td>
        <input type='text' name='3'>
        </td></tr>
        <tr><td>URL수</td><td>
        <input type='number' name='4'>
        </td></tr>
        <tr><td>진단자</td><td>
        <input type='text' name='5'>
        </td></tr>
        <tr><td>점검회차</td><td>
        <input type='number' name='6'>
        </td></tr>
        <tr><td>진단공수</td><td>
        <input type='number' name='7'>
        </td></tr>
        <tr><td>진단시작일</td><td>
        <input type='date' name='8' value="1995-06-15">
        </td></tr>
        <tr><td>진단종료일</td><td>
        <input type='date' name='9' value="1995-06-15">
        </td></tr>
        <tr><td>조치예정일</td><td>
        <input type='date' name='10' value="1995-06-15">
        </td></tr>
        <tr><td>비고</td><td>
        <input type='text' name='11'>
        </td></tr>
        <tr><td>
        <input type='submit'></td></tr>
        </table>
        </form>
        <br><table border='1'><th bgcolor="#D9E5FF">대상명</th><th bgcolor="#D9E5FF">기존진단구분</th><th>진단대상관리코드</th><th>진행상태</th><th>URL or IP</th><th>URL 수</th><th>진단자</th><th>점검회차</th><th>진단공수</th><th>진단 시작일</th><th>진단 종료일</th><th>조치 예정일</th><th>비고</th>
        `;
        for(const key of rows){
            body += "<tr>";
            console.log(key.project_code);
                for(const key2 in key){
                    //console.log(key[key2]);
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
                      console.log(key2);
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
    
});

router.post('/', (req, res, next) => {
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'skcncmanagerdb'
      });      
    connection.connect();
    var sql = "INSERT INTO penetrationtest (manage_code, status, url, urlcount, pentester, testcount, manday, startdate, enddate, actdate, memo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var values = []
    //받은 파라미터를 values에 추가
    for (const key in req.body){
        values.push(req.body[key]);
    //   if (key === 17 || key === 18 || key === 19 || key === 21 || key === 22 || key === 23 || key === 24 || key === 25 || key === 26 || key === 27 || key === 29) {
    //     values.push(Boolean(req.body[key]))
    //   } else {
    //     values.push(String(req.body[key]))
    //   };
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
    //302
    res.redirect(302, "/m/penetrationtest");
    connection.end();
  });

module.exports = router;
