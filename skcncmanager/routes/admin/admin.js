var express = require('express');
var router = express.Router();
var db = require('../db');


router.get('/',async function(req, res, next) {
    sql = `select * from user`
    db.query(sql, (error, rows, fields) => {
        console.log(rows)
        title = "admin"
        head = "head"
        body =`
            <div id="grid"></div>
            <form id="makeuser">
                NAME: <input type="text" name="name"><br>
                ID: <input type="text" name="id"><br>
                PW: <input type="password" name="pw"><br>
                LEVEL: <input type="number" name="level"><br>
                <button type="button" onclick="collectFormData()">계정 생성</button>
            </form>`
        script = `
            <script>const data = ${JSON.stringify(rows)}</script>
            <link rel="stylesheet" href="/tui/tui-grid.css" />
            <script src="/tui/tui-grid.js"></script>
            <script src="/js/tui/js_admin.js"></script>`
        res.render('tmpgrid3', { title : "Project", head : head, body : body, script : script, user : req.user.username});
    })    
});

module.exports = router;
