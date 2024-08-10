var express = require('express');
var router = express.Router();

const m = require('./m/m');
const admin = require('./admin/admin');
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

function encpassword(pass){  
  const crypto = require('crypto');
  pass = crypto.createHash('sha256')
                    .update(pass)
                    .digest('hex');
  pass = crypto.createHash('sha256')
                    .update(pass+"MAJUNYOUNG")
                    .digest('hex');
  return pass
}

router.get('/', function(req, res, next) {
  const token1 = req.cookies.auth;
  jwt.verify(token1, SECRET_KEY, (err, decoded) => {
    if (err) {
      body = `<form action="/login" method="post">
            <input type="text" name="id" placeholder="아이디" required>
            <input type="password" name="pw" placeholder="비밀번호" required>
            <button type="submit">로그인</button>
        </form>`
      decoded = {name : "not login"}
    }else{
      body = `${decoded.name}님 환영합니다.<br>${JSON.stringify(decoded)}`
    }
    res.render('view', { title: 'SK C&C MANAGER', head: "", body: body, script : "<script></script>", user : decoded});
  });
});

router.post('/ip_name', (req, res, next) => { // 퍼미션 문제로 router.use(verifyJWT); 이전에 놓기위해 api에 넣지않고 여기에 넣음.
  var sql = "INSERT INTO userip (username, ip) VALUES (?, ?)";
  var values = req.body;
  console.log(req.body);
  db.query(sql,values,function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  }); 
});

router.post('/login', (req, res, next) => { // 퍼미션 문제로 router.use(verifyJWT); 이전에 놓기위해 api에 넣지않고 여기에 넣음.
  let previousUrl = req.get('referer');
  let value = [req.body.id, encpassword(req.body.pw)]
  console.log(value)
  let sql = "select id, name, level from user where id=? and pw=?"
  db.query(sql, value, (err, rows) => {
    if (rows.length === 0) {
      console.log('리스트가 비어 있습니다.');
      res.redirect(previousUrl);
    } else {
      console.log('리스트에 요소가 있습니다.');
      const user = rows[0];
      const token = jwt.sign(user, SECRET_KEY, { expiresIn: '24h' });
      res.cookie('auth', token, {
        maxAge: 1000 * 60 * 60 * 24, // 1일 (밀리초 단위)
        httpOnly: true,
      });
      res.redirect(previousUrl);
    }
  })
});

router.get('/logout', (req, res) => {
  // 쿠키를 삭제 (만료 날짜를 과거로 설정)
  res.clearCookie('auth', { path: '/' });
  
  // 홈 페이지 또는 로그인 페이지로 리디렉션
  res.redirect('/');
});

router.use(verifyJWT);
router.use("/m",m);
router.use("/admin",admin);

module.exports = router;