var express = require('express');
var router = express.Router();
var db = require('../../db');
const Handsontable = require('handsontable');

router.get('/', function(req, res, next) {
    var title = "타이틀"
    var head = "헤드"
    var body = "바디"
    sql = `SELECT project_name, old_inspectiontype, penetrationtest.manage_code, status, url, urlcount, pentester, testcount, manday, DATE_FORMAT(startdate, "%y-%m-%d"), DATE_FORMAT(enddate, "%y-%m-%d"), DATE_FORMAT(actdate, "%y-%m-%d"), memo FROM penetrationtest INNER JOIN project_table ON penetrationtest.manage_code = project_table.manage_code WHERE (penetrationtest.manage_code, testcount) IN (SELECT manage_code, MAX(testcount) AS max_testcount FROM penetrationtest GROUP BY manage_code) ORDER BY penetrationtest.manage_code`;
    db.query(sql,function(err, rows, fields) {
        const data = [
            ['대상명', '기존진단구분', '진단대상관리코드', '진행상태','URL or IP', 'URL 수', '진단자', '점검회차', '진단공수', '진단 시작일', '진단 종료일', '조치예정일', '비고'],
          ];
        //에러처리
        if (err){
          console.log(err);
        }
        else{
          console.log(rows.insertId);
        };
        //에러처리
        for(const keyrows in rows){
            const datadata = [];
            for(const keykeyrows in rows[keyrows]){
                datadata.push(rows[keyrows][keykeyrows]);                
            };
            data.push(datadata);     
        };
        console.log(data);
        res.render('gridtest', { data });    
      });      
});

router.post('/', function(req, res, next) {
  console.log(req.body);
});

module.exports = router;
