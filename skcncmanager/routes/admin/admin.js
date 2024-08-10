var express = require('express');
var router = express.Router();
var db = require('../db');

function verifyJWT(req, res, next) {
    const token = req.cookies.auth;
  
    if (!token) {
        return res.redirect('/');
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.redirect('/');
        }
        if(decoded.level<9){
            return res.redirect('/');
        }
  
        req.user = decoded;
        next();
    });
};
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SKCNCMAJUNYOUNG';
router.use(verifyJWT);

router.get('/', function(req, res, next) {
    sql = `select * from user`
    db.query(sql, (error, rows, fields) => {
        console.log(rows)
        title = "admin"
        head = "head"
        body =`
            <div id="grid"></div>
            <form id="makeuser">                
                ID: <input type="text" name="id"><br>
                PW: <input type="password" name="pw"><br>
                NAME: <input type="text" name="name"><br>
                LEVEL: <input type="number" name="level"><br>
                <button type="button" onclick="collectFormData()">계정 생성</button>
            </form>`
        script = `
            <script>const data = ${JSON.stringify(rows)}</script>
            <link rel="stylesheet" href="/tui/tui-grid.css" />
            <script src="/tui/tui-grid.js"></script>
            <script src="/js/tui/js_admin.js"></script>`
        res.render('view', { title : "관리", head : head, body : body, script : script, user : req.user});
    })    
});

module.exports = router;
