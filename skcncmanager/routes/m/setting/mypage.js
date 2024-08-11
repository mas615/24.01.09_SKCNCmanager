var express = require('express');
var router = express.Router();
var db = require('../../db');

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
//router.use(verifyJWT);

router.get('/', function(req, res, next) {
    head = ''
    body = `<form id="mypassword">
                기존패스워드: <input type="password" name="oldpw"><br><br>
                신규패스워드: <input type="password" name="newpw2"><br>
                신규패스워드 한번 더 입력: <input type="password" name="newpw2"><br>
                <button type="button" onclick="collectFormData()">계정 생성</button>
            </form>`
    script = `<script src='/js/js_mypage.js'></script>`
    res.render('view', { title : "setting", head : head, body : body, script : script, user : req.user});
});

module.exports = router;
