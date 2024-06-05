var express = require('express');
var router = express.Router();
var db = require('../../db');

router.get('/', function(req, res, next){
    sql = `SELECT seq, manage_code, status, url, urlcount, type, pentester, testcount, manday, memo, DATE_FORMAT(startdate, "%y-%m-%d"), DATE_FORMAT(enddate, "%y-%m-%d"), DATE_FORMAT(actdate, "%y-%m-%d") FROM penetrationtest`;
    db.query(sql, (error, row, result) => {
        const body = `<button onclick="send()">버튼</button><div id="data"></div>`;
        const script = `
            <script>const data = ${JSON.stringify(row)};</script>
            <script src="/js/js_penetrationtest_manage.js"></script>`;
            res.render('tmpgrid3', { title : "Project", head : "<script></script>", body : body, script : script, user : req.user.username});
    });    
});

router.get('/insert', function(req, res, next){
        const body = `<button onclick="send()">버튼</button><div id="data"></div>`;
        const script = `
            <script src="/js/js_penetrationtest_manage_insert.js"></script>`;
            res.render('tmpgrid3', { title : "Project", head : "<script></script>", body : body, script : script, user : req.user.username});
});

module.exports = router;