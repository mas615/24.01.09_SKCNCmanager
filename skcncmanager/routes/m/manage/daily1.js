var express = require('express');
var router = express.Router();
var db = require('../../db');

//DATE_FORMAT(startdate, "%y-%m-%d")

router.get('/', function(req, res, next) {
    console.log(req.user.username);
    sql = `SELECT id, part, ranking, project, type, DATE_FORMAT(date1, '%y-%m-%d') AS date1, DATE_FORMAT(date2, '%y-%m-%d') AS date2, DATE_FORMAT(date3, '%y-%m-%d') AS date3, DATE_FORMAT(date4, '%y-%m-%d') AS date4, tester, status, memo1, memo2 FROM daily_table where part = "모의해킹"`;
    data =[];
    db.query(sql, (error, rows, fields) => {
        for(const key of rows){
            fordata =[];
            for(const keykey in key){
                fordata.push(key[keykey]);
            };
            data.push(fordata);
        };
        body = `<button id="addButton">행추가</button> <button id="submitButton">저장</button><div id="data"></div>`;
        script = `<script src="/handsontable/handsontable.full.js"></script>
        <script>const data = ${JSON.stringify(data)};</script>
        <script src="/js/js_daily.js"></script>`;
        res.render('tmpgrid3', { title : "데일리 모의해킹", head : null, body : body, script : script, user : req.user.username});
    });
    
});

module.exports = router;
