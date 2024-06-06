var express = require('express');
var router = express.Router();
var db = require('../../db');

router.get('/', function(req, res, next) {
    sql = `SELECT * from userip`;
    data =[];
    db.query(sql, (error, rows, fields) => {
        for(const key of rows){
            fordata =[];
            for(const keykey in key){
                console.log(key[keykey])
                fordata.push(key[keykey]);
            };
            data.push(fordata);
        };
        body = `<br><div id="example"></div>`;
        script = `<script src="/handsontable/handsontable.full.js"></script>
        <script>const data = ${JSON.stringify(data)};</script>
        <script src="/js/js_pentestcount.js"></script>`;
        res.render('tmpgrid', { title : "통계", head : "head", body : body, script : script});
    });
    
});

module.exports = router;
