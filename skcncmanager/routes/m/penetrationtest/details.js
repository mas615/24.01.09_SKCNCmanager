var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var db = require('../../db');


router.get('/', function(req, res, next) {
    var title = "디테일"
    var head = "헤드"
    sql = 'select testcount, status, url, urlcount, pentester, manday, DATE_FORMAT(startdate,"%y-%m-%d"), DATE_FORMAT(enddate,"%y-%m-%d"), DATE_FORMAT(actdate,"%y-%m-%d"), memo from penetrationtest inner join project_table on penetrationtest.manage_code = project_table.manage_code where penetrationtest.manage_code = ? order by penetrationtest.seq';
    var values = [];
    values.push(req.query.code);
    
    db.query(sql, values, (error, rows, fields) => {
      console.log('러우스',rows[1].testcount);
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
        body += `</table>`;
        //console.log('타입',rows.length);
        for(const key in rows){
          if (key == 0){
            body += `<a href='./detail?code=${req.query.code}&testcount=${key}'>★최초진단★</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
          }else{
            body += `<a href='./detail?code=${req.query.code}&testcount=${key}'>★이행 ${key}차★</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
          };          
        }
        body += `<a href="./pushdetail?code=${req.query.code}">★★이행차수 추가★★</a>`;
        //취약점 목록 출력
        sql2 = `select seq, manage_code, testcount, vulner, memo, vulnerspot, DATE_FORMAT(lastdate, "%y-%m-%d"), status, vulnermanager, vulnernote, vulnermemo from penetrationtest_vulner where manage_code=? and testcount=? order by seq`;
        values2 = [];
        values2.push(req.query.code);
        values2.push(req.query.testcount);
        db.query(sql2, values2, (error, rows2, fields) => {
          body +=`<br><table border='1'>`;
          rows2table = ['취약점 번호','관리코드','점검회차','취약점','내용','발생위치','최종점검일','조치상태'];
          for(const rows2tablekey of rows2table){
            body += `<th>${rows2tablekey}</th>`;
          };
          rows2table = ['담당자','조치내용','비고'];
          for(const rows2tablekey of rows2table){
            body += `<th bgcolor="#D9E5FF">${rows2tablekey}</th>`;
          };
          
          for(const rows2key of rows2){
            body += `<tr>`;
            for(const rows2keykey in rows2key){
              body += `<td>${rows2key[rows2keykey]}</td>`;
            }
            body += `</tr>`;
          }
          var selectvuln = ['버퍼오버플로우','포맷스트링','LDAP인젝션','운영체제 명령 실행','SQL 인젝션','SSL 인젝션','XPath 인젝션'];
          var selectoption ='';
          for(const selectvulnkey in selectvuln){
            //console.log(selectvuln[selectvulnkey]);
            selectoption += `<option value='${selectvulnkey}.${selectvuln[selectvulnkey]}'>${selectvulnkey}.${selectvuln[selectvulnkey]}</option>`;
          };
          if(req.query.testcount == (rows.length-1)){
            body += `<tr><form action='./pushvulner' method='post'>
            <td>취약점 추가<input type='submit'></td>
            <td>${req.query.code}<input type='hidden' name='1' value='${req.query.code}'></td>
            <td>${req.query.testcount}<input type='hidden' name='2' value='${req.query.testcount}'></td>
            <td><select name='3'>${selectoption}</select></td>
            <td><textarea name='4'></textarea></td>
            <td><textarea name='5'></textarea></td>
            <td><input type='date' name='6' id='now_date1'></td>
            <td><select name='7'><option value='미조치'>미조치</option><option value='조치완료'>조치완료</option></select></td>
            <td><input type='text' name='8' size='5'></td>
            <td><textarea name='9'></textarea></td>
            <td><textarea name='10'></textarea></td></tr>`
            body +=`</form></table><script>document.getElementById('now_date1').valueAsDate = new Date();</script>`;
          };
          res.render('tmp', { title : title, head : "", body : body});
        });      
    });
  });

module.exports = router;