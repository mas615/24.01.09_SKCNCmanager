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

router.get('/', function(req, res, next) {
  sql = 'select username, level from userip where ip = ?'
  db.query(sql, req.ip, (error, rows, fields) => {
    if(error){
      return res.status(500).send('Internal Server Error');
    };
    console.log(req.ip);

    if (rows.length === 0){ // 저장된 내용이 없을때.
      body = `[${req.ip}]<br>등록된 아이피가 없습니다. 이름을 등록하세요.`
      body += `<form id="myForm">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <input type="hidden" id="hiddenValue" name="hiddenValue" value="${req.ip}">
                    <button type="submit">Submit</button>
                </form>`;
      script = `
      <script>
          document.getElementById('myForm').addEventListener('submit', function(event) {
              event.preventDefault(); // 폼의 기본 제출 동작 방지

              const name = document.getElementById('name').value;
              const hiddenValue = document.getElementById('hiddenValue').value;

              // 데이터 준비
              const data = [name,hiddenValue];

              // 서버로 데이터 보내기
              fetch('./ip_name', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              })
              .then(response => {
                  if (response.status === 200) {
                      // 상태 코드가 200인 경우 페이지 새로고침
                      location.reload();
                  } else {
                      // 그 외 상태 코드인 경우 alert 창 표시
                      alert('An error occurred: ' + response.status);
                  }
              })
              .catch(error => {
                  // 네트워크 오류 등 예외 처리
                  alert('An error occurred: ' + error.message);
              });
          });
      </script>`
      res.render('tmpgrid3', { title: 'SK C&C MANAGER', head: "", body: body, script : script, user : "username"});
    } else{
      console.log(rows[0].username);
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
        body = 
          `<h1>${data.username}님 접속을 환영합니다.</h1>
          접속 IP : [${req.ip}]`;
        res.render('tmpgrid3', { title: 'SK C&C MANAGER', head: "", body: body, script : "<script></script>", user : data.username});
      });
    };    
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

router.use(verifyJWT);
router.use("/m",m);
router.use("/admin",admin);

module.exports = router;