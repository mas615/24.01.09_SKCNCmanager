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
        var now_date = ``;
        for(const rowskey in rows[0]){
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
        console.log(rows[0].testcount);
        body += `<td><input type='submit'></td></tr></table>`;
        sql2 = `select vulner, memo, vulnerspot, DATE_FORMAT(lastdate, "%y-%m-%d"), status, vulnermanager, vulnernote, vulnermemo from penetrationtest_vulner where manage_code=? and testcount=? order by seq`;
        values2 = [req.query.code,rows[0].testcount];
        connection.query(sql2, values2, (error, rows2, fields) => {
          body +=`<br><table border='1'>`;
          rows2table = ['취약점','내용','발생위치','최종점검일','조치상태'];
          for(const rows2tablekey of rows2table){
            body += `<th>${rows2tablekey}</th>`;
          };
          rows2table = ['담당자','조치내용','비고'];
          for(const rows2tablekey of rows2table){
            body += `<th bgcolor="#D9E5FF">${rows2tablekey}</th>`;
          };
          rownum = 0;
          for(const rows2key of rows2){
            body += `<tr>`;
            name = 0;
            for(const rows2keykey in rows2key){
              if(rows2keykey == 'DATE_FORMAT(lastdate, "%y-%m-%d")'){
                body += `<td><input type='date' name='${rownum}.${name}' id='${rownum}.${name}'></td>`;
                now_date +=`document.getElementById('${rownum}.${name}').valueAsDate = new Date();`;
                name += 1;
              }else if(rows2keykey == 'status'){
                console.log(rows2key[rows2keykey]);
                if(rows2key[rows2keykey] == '조치완료'){
                  body += `<td>${rows2key[rows2keykey]}<input type='hidden' name='${rownum}.${name}' value='${rows2key[rows2keykey]}'></td>`;
                }else{
                  body += `<td><select name='${rownum}.${name}'><option value='미조치'>미조치</option><option value='조치완료'>조치완료</option></select></td>`;
                };
                name += 1;
              }else{
                body += `<td>${rows2key[rows2keykey]}<input type='hidden' name='${rownum}.${name}' value='${rows2key[rows2keykey]}'></td>`;
                name += 1;
              };              
            };
            body += `</tr>`;
            rownum += 1;
          }
          body += `</table></form><script>${now_date}</script>`;
          res.render('tmp', { title : title, head : head, body : body});
        });       
    });    
});

router.post('/', (req, res, next) => {  
    //connection.connect();
    var sql = "INSERT INTO penetrationtest (testcount, url, urlcount, pentester, status, manday, startdate, enddate, actdate, memo, manage_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var sql2 = `INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, memo, vulnerspot, lastdate, status, vulnermanager, vulnernote, vulnermemo) VALUES ('${req.body.code}',${req.body[0]},?,?,?,?,?,?,?,?)`;
    var values = [];
    var vulnvalues =[];
    //받은 파라미터를 values에 추가
    var reqbodynum = 0;
    var vulnvaluesnum = 0;
    for (const key in req.body){
      if(reqbodynum < 11){
        if(req.body[key]==''){
          values.push(null);
          reqbodynum++;
        }else{
          values.push(req.body[key]);
          reqbodynum++;
        };
      }else{
        if(vulnvaluesnum == 8){
          sql2 += `,('${req.body.code}',${req.body[0]},?,?,?,?,?,?,?,?)`;
          vulnvaluesnum = 0;
        }
        if(req.body[key]==''){
          vulnvalues.push(null);
          vulnvaluesnum++;
        }else{
          vulnvalues.push(req.body[key]);
          vulnvaluesnum++;
        };
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
    connection.query(sql2,vulnvalues,function(err, rows, fields) {
      if (err){
        console.log(err);
      }
      else{
        console.log(rows.insertId);
      }
    });
    302
    res.redirect(302, `/m/penetrationtest/detail?code=${req.body.code}&testcount=${req.body[0]}`);
    //connection.end();
  });

module.exports = router;
