var express = require('express');
var router = express.Router();
const m = require('./m/m');
var db = require('./db');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SKCNCMAJUNYOUNG';

function verifyJWT(req, res, next) {
  const token = req.cookies.auth;

  if (!token) {
      return res.redirect('/');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
          return res.redirect('/');
      }

      req.user = decoded;
      next();
  });
};

router.get('/', function(req, res, next) {
  sql = 'select username from userip where ip = ?'
  db.query(sql, req.ip, (error, rows, fields) => {
    if(error){
      return res.status(500).send('Internal Server Error');
    };

    if (rows.length === 0){ // 저장된 내용이 없을때.
      body = `[${req.ip}]<br>등록된 아이피가 없습니다. 이름을 등록하세요.`
      res.render('tmpgrid3', { title: 'SK C&C MANAGER', head: "", body: body, script : "<script></script>", user : "username"});
    } else{
      console.log(rows);
      const user = rows[0];
      const token = jwt.sign(user, SECRET_KEY, { expiresIn: '24h' });
      res.cookie('auth', token, {
        maxAge: 1000 * 60 * 60 * 24, // 1일 (밀리초 단위)
        httpOnly: true,
      });

      jwt.verify(token, SECRET_KEY, (err, data) => {
        if (err) {
          return res.sendStatus(403);
        };
        body = `아이피 : ${req.ip}<br>
        토큰 : ${token}<br>
        토큰 안의 데이터 : ${data.username}`
        res.render('tmpgrid3', { title: 'SK C&C MANAGER', head: "", body: body, script : "script", user : data.username});
      });
    };    
  });
});

router.use(verifyJWT);
router.use("/m",m);

module.exports = router;