var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var db = require('../../db');
//라우팅
const detail = require('./detail.js');
const pushvulner = require('./pushvulner.js');
const pushdetail = require('./pushdetail.js');
const pushdetails = require('./pushdetails.js');
const pentestcount = require('./pentestcount.js');
const gridtest = require('./gridtest.js');
const penetrationtestinsert = require('./penetrationtestinsert.js');
const detailtest = require('./detailtest.js');
const details = require('./details.js');
const penetrationtest_manage = require('./penetrationtest_manage.js');
const vulner_manage = require('./vulner_manage.js');

router.use("/detail", detail);
router.use("/pushvulner", pushvulner);
router.use("/pushdetail", pushdetail);
router.use("/pushdetails", pushdetails);
router.use("/pentestcount", pentestcount);
router.use("/gridtest", gridtest);
router.use("/penetrationtestinsert", penetrationtestinsert);
router.use("/detailtest", detailtest);
router.use("/details", details);
router.use("/penetrationtest_manage", penetrationtest_manage);
router.use("/vulner_manage", vulner_manage);

router.get('/', function(req, res, next) {
    sql = `SELECT project_name, penetrationtest.manage_code, status, CONCAT(SUBSTRING(SUBSTRING_INDEX(url, '\n', 1), 1, 30), '...'), urlcount, type, pentester, testcount, manday, CONCAT(SUBSTRING(SUBSTRING_INDEX(memo, '\n', 1), 1, 30), '...'), DATE_FORMAT(startdate, "%y-%m-%d"), DATE_FORMAT(enddate, "%y-%m-%d"), DATE_FORMAT(actdate, "%y-%m-%d") FROM penetrationtest INNER JOIN project_table ON penetrationtest.manage_code = project_table.manage_code WHERE (penetrationtest.manage_code, testcount) IN (SELECT manage_code, MAX(testcount) AS max_testcount FROM penetrationtest GROUP BY manage_code) ORDER BY penetrationtest.manage_code`;
    db.query(sql, (error, rows, fields) => {
      if (error) throw error;
        const data = [];
        for(const rowskey of rows){
          const datadata = [];
          for(const rowskeykey in rowskey){            
            datadata.push(rowskey[rowskeykey]);
          };
          data.push(datadata);
        };
        var head = `<link href="/handsontable/handsontable.full.css" rel="stylesheet">`;
        var body = `<button id="clearFiltersButton" onclick='location.href="./penetrationtest/detailtest"'>대상 추가</button><div id="example"></div>`;
        script = `<script src="/handsontable/handsontable.full.js"></script>
        <script>const data = ${JSON.stringify(data)};</script>
        <script src="/js/js_penetrationtest.js"></script>`;

        res.render('tmpgrid3', { title : "모의해킹 종합", head : null, body : body, script : script, user : req.user.username});
        //connection.end();
    });    
});

router.post('/', (req, res, next) => {
    var sql = "INSERT INTO penetrationtest (manage_code, status, url, urlcount, pentester, testcount, manday, startdate, enddate, actdate, memo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var values = []
    console.log(values);
    //받은 파라미터를 values에 추가
    for (const key in req.body){
      if(req.body[key]==''){
        values.push(null);
      }else{
        values.push(req.body[key]);
      };        
    };
    //쿼리 실행
    db.query(sql,values,function(err, rows, fields) {
      if (err){
        console.log(err);
      }
      else{
        console.log(rows.insertId);
      }
    });
    //302
    res.redirect(302, "/m/penetrationtest");
    //connection.end();
  });


module.exports = router;
