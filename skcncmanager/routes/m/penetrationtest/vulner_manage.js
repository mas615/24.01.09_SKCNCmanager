var express = require('express');
var router = express.Router();
var db = require('../../db');

router.get('/', function(req, res, next){
    sql = `SELECT seq, testcount, manage_code, vulner, risklevel, memo, vulnerspot, DATE_FORMAT(startdate, "%y-%m-%d"), DATE_FORMAT(lastdate, "%y-%m-%d"), status, vulnermemo, vulnermanager, actdate, vulnernote, laststatus FROM penetrationtest_vulner;
    `;
    db.query(sql, (error, row, result) => {
        const body = `<button onclick="send()">저장</button><div id="data"></div>`;
        const script = `
            <script>const data = ${JSON.stringify(row)};</script>
            <script src="/js/js_vulner_manage.js"></script>`;
        res.render('tmpgrid', { title : "Project", head : "head", body : body, script : script});
    });    
});

module.exports = router;