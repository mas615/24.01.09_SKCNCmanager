var express = require('express');
var router = express.Router();
var db = require('../../db');

router.get('/', function(req, res, next){
    sql = `SELECT * FROM penetrationtest`;
    db.query(sql, (error, row, result) => {
        console.log(row);
        console.log(result)
        const body = `<button onclick="send()">버튼</button><div id="data"></div>`;
        const script = `
            <script>const data = ${JSON.stringify(row)};</script>
            <script src="/js/js_penetrationtest_manage.js"></script>`;
        res.render('tmpgrid', { title : "Project", head : "head", body : body, script : script});
    });    
});

module.exports = router;