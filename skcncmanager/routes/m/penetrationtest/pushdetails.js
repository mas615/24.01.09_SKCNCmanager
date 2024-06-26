var express = require('express');
var router = express.Router();
var db = require('../../db');

router.get('/', function(req, res, next) {
    sql = 'select testcount, url, urlcount, type, pentester, status, manday, DATE_FORMAT(curdate(),"20%y-%m-%d"), DATE_FORMAT(now(),"20%y-%m-%d"), DATE_FORMAT(actdate,"%y-%m-%d"), memo from penetrationtest inner join project_table on penetrationtest.manage_code = project_table.manage_code where penetrationtest.manage_code = ? order by penetrationtest.testcount desc limit 1';
    sql2 = `select vulner, risklevel, memo, vulnerspot, DATE_FORMAT(startdate, "20%y-%m-%d"), DATE_FORMAT(lastdate, "20%y-%m-%d"), status, vulnermemo, vulnermanager, actdate, vulnernote from penetrationtest_vulner where manage_code=? and testcount=? order by seq`;
    values = [req.query.code];
    values2 = [req.query.code];
    body = `<button id="addButton">취약점 추가</button><button onclick="aalert()">저장</button><br>진단차수 <div id="data"></div>취약점<br><div id="data2"></div>`;
    try {
        const data = [];
        const data2 = [];
        db.query(sql, values, (error, rows, fields) => {
            console.log(rows[0]);            
            values2.push(rows[0].testcount);
            rows[0].testcount += 1;
            for(const rowskey in rows[0]){
                data.push(rows[0][rowskey]);                
            };
            db.query(sql2, values2, (error, rows2, fields) => {
                for(const rowskey2 of rows2){
                    const datadata2 = [];
                    for(const rowskeykey2 in rowskey2){            
                    datadata2.push(rowskey2[rowskeykey2]);
                    };
                    data2.push(datadata2);
                };
                script = `<script>
                    const data = [${JSON.stringify(data)}];
                    const data2 = ${JSON.stringify(data2)};
                    const code = "${req.query.code}";
                    </script>
                    <script src="/js/js_pushdetails.js"></script>`;
                res.render('tmpgrid', { title : "모의해킹 종합", head : null, body : body, script : script});
            });            
        });        
    } catch(e){
        res.render('tmpgrid', { title : "에러발생", head : null, body : "오류 발생", script : "오류 발생"});
    };
    
});

module.exports = router;