var express = require('express');
var router = express.Router();
var db = require('../../db');


router.get('/', function(req, res, next) {
    var title = "타이틀"
    var head = "헤드"
    sql = 'select testcount, status, url, urlcount, pentester, manday, DATE_FORMAT(startdate,"%y-%m-%d"), DATE_FORMAT(enddate,"%y-%m-%d"), DATE_FORMAT(actdate,"%y-%m-%d"), memo from penetrationtest inner join project_table on penetrationtest.manage_code = project_table.manage_code where penetrationtest.manage_code = ? order by penetrationtest.testcount';
    sql2 = `select seq, testcount, vulner, memo, vulnerspot, DATE_FORMAT(lastdate, "%y-%m-%d"), status, vulnermanager, vulnernote, vulnermemo from penetrationtest_vulner where manage_code=? and testcount=? order by seq`;
    var values = [];
      values.push(req.query.code);
    var values2 = [];
      values2.push(req.query.code);
      values2.push(req.query.testcount);
    body = `<button id="clearFiltersButton" onclick='location.href="./pushdetails?code=${req.query.code}"'>차수 추가</button><div id="data1"></div><div id="data2"></div>`;
    try{
      db.query(sql, values, (error, rows, fields) => {
        db.query(sql2, values2, (error, rows2, fields) => {
          const data = [];
          for(const rowskey of rows){
            const datadata = [];
            for(const rowskeykey in rowskey){            
              datadata.push(rowskey[rowskeykey]);
            };
            data.push(datadata);
          };
          
          const data2 = [];
          for(const rowskey2 of rows2){
            const datadata2 = [];
            for(const rowskeykey2 in rowskey2){            
              datadata2.push(rowskey2[rowskeykey2]);
            };
            data2.push(datadata2);
          };
          console.log(data2);

          script = `<script>
            const data = ${JSON.stringify(data)};
            const data2 = ${JSON.stringify(data2)};
            const code = "${req.query.code}";
            </script>
            <script src="/js/js_details.js"></script>`;
          res.render('tmpgrid', { title : req.query.code + "-" +req.query.testcount + "회차", head : null, body : body, script : script});
        });//db
      });//db
    } catch(e){
      res.render('tmpgrid', { title : "오류발생", head : null, body : e, script : "script"});
    };//try catch
  });//router

module.exports = router;