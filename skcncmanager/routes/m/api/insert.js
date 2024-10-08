var express = require('express');
var router = express.Router();
var db = require('../../db');
var modules = require('../../module/modules');

router.post('/testapi', function(req, res, next) {
  console.log(req.body);
  res.status(200).json({ success: "resresult" });
});

//프로젝트 관련
router.post('/project', (req, res, next) => {
    var sql = "INSERT INTO project_table (project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, open_date, relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project, del) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'false')";
    var values = req.body;
    db.query(sql,values,function(err, rows, fields) {
      if (err){
        res.status(500).json({ err: err });
      }
      else{
        res.status(200).json({ success: "resresult" });
      }
    }); 
});

router.post('/project_del', function(req, res, next) {
  var sql = "delete from project_table where seq = ?";
  db.query(sql,[req.body[0]],function(err, rows, fields) {
    if (err){
      res.status(404).json({ error: req.body[0] });
    }
    else{
      res.status(200).json({ success: req.body[0] });
    }
  }); 
});

router.post('/pentest', (req, res, next) => {
  var sql = "INSERT INTO penetrationtest (manage_code, status, url, urlcount, type, pentester, testcount, manday, startdate, enddate, actdate, memo) VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?)";
  //for문 돌려서 넣기 + 에러나면 에러 카운트 보내기 + for문 다돌면 그때 res보내기.
    db.query(sql,req.body.rowData[0][0],function(err, rows, fields) {
      if (err){
        res.status(500).json({ "진단대상 오류": err.sqlMessage });
        console.error(err);
      }
      else{
        res.status(200).json({ data: req.body.rowData[0][0][0] });
      }
    });
});

router.post('/pushdetails', (req, res, next) => {
  var sql = "INSERT INTO penetrationtest (manage_code, testcount, url, urlcount, type, pentester, status, manday, startdate, enddate, actdate, memo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"; 
  db.query(sql,req.body[0],function(err, rows, fields) {
    if (err){
      res.status(500).json({ "실패": "실패" });
      console.error(err);
    }
    else{
      res.status(200).json({ "성공": "성공" });
    }
  });
});

router.post('/pushdetails2', async (req, res, next) => {
  const sql = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, risklevel, memo, vulnerspot, startdate, lastdate, status, vulnermemo, vulnermanager, actdate, vulnernote) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
  try {
    // 모든 쿼리를 Promise.all로 실행
    await Promise.all(req.body.map(key => {
      return new Promise((resolve, reject) => {
        db.query(sql, key, function(err, rows, fields) {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }));

    // 모든 쿼리가 성공적으로 실행되면
    res.status(200).json({ "성공": "성공" });
  } catch (err) {
    // 하나라도 오류가 발생하면
    console.error(err);
    res.status(500).json({ "오류": "데이터베이스 오류 발생" });
  }
});

router.post('/vulner', function(req, res, next) { 
  const sql = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, risklevel, memo, vulnerspot, startdate, lastdate, status, vulnermemo, vulnermanager, actdate, vulnernote) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)';
  const insertions = req.body.rowData.map(bodykey => {
    return new Promise((resolve, reject) => {
      db.query(sql, bodykey, (err, rows, fields) => {
        if(err){
          reject(err);
        } else {
          resolve(rows);
        }    
      });
    });
  });

  Promise.all(insertions)
    .then(() => {
      res.status(200).json({ data: "ㅎㅇㅎㅇ" });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ "취약점 오류" : error.sqlMessage });
    });
});

router.post('/addvulner', function(req, res, next) { 
  sql = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, memo, vulnerspot, lastdate, status, vulnermanager, vulnernote, vulnermemo) VALUES (?,?,?,?,?,?,?,?,?,?)';
  sql2 = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, memo, vulnerspot, lastdate, status, vulnermanager, vulnernote, vulnermemo) VALUES (?,?,?,?,?,?,?,?,?,?)';

  for(const bodykey of req.body.rowData){
    db.query(sql, bodykey, (err, rows, fields) => {
      if(err){
        console.log(err);
      }else{
        console.log(rows);
      };
      //최초가 아닐때 최초(testcount = 0)에도 취약점을 넣어주는 코드
      if(bodykey[1] != 0){
        bodykey[1] = 0;
        db.query(sql, bodykey, (err, rows, fields) => {
          if(err){
            console.log(err);
          }else{
            console.log(rows);
          };
        });
      };      
    });
  };
  res.status(200).json({ success: "ㅎㅇㅎㅇ" });
});

router.post('/penetrationtest_manage', function(req, res, next) {
  let arr = req.body;
  // 첫 번째 요소 삭제
  arr.shift();
  // 두 번째 요소를 맨 뒤로 보내기
  arr.push(arr.shift());
  var sql = "UPDATE penetrationtest SET manage_code = ?, status = ?, url = ?, urlcount = ?, type = ?, pentester = ?, testcount = ?, manday = ?, memo = ?, startdate = ?, enddate = ?, actdate = ? WHERE seq = ?";
  db.query(sql,arr,function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
      console.log(err)
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  }); 
});

router.post('/penetrationtest_manage_del', function(req, res, next) {
  var sql = "delete from penetrationtest where seq = ?";
  db.query(sql,[req.body[1]],function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
      console.log(err)
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  }); 
});

router.post('/penetrationtest_manage_insert', function(req, res, next) {
  var sql = "INSERT INTO penetrationtest (manage_code, status, url, urlcount, type, pentester, testcount, manday, memo, startdate, enddate, actdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql,req.body,function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
      console.log(err)
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  }); 
});

router.post('/vulner_manage', function(req, res, next) {
  let arr = req.body;
  // 첫 번째 요소 삭제
  arr.shift();
  // 두 번째 요소를 맨 뒤로 보내기
  arr.push(arr.shift());
  var sql = "UPDATE penetrationtest_vulner SET testcount = ?, manage_code = ?, vulner = ?, risklevel = ?, memo = ?, vulnerspot = ?, startdate = ?, lastdate = ?, status = ?, vulnermemo = ?, vulnermanager = ?, actdate = ?, vulnernote = ? WHERE seq = ?";
  db.query(sql,arr,function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
      console.log(err)
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  }); 
});

router.post('/vulner_manage_del', function(req, res, next) {
  var sql = "delete from penetrationtest_vulner where seq = ?";
  db.query(sql,[req.body[1]],function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
      console.log(err)
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  }); 
});

router.post('/vulner_manage_insert', function(req, res, next) {
  var sql = "INSERT INTO penetrationtest_vulner (testcount, manage_code, vulner, risklevel, memo, vulnerspot, startdate, lastdate, status, vulnermemo, vulnermanager, actdate, vulnernote) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql,req.body,function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
      console.log(err)
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  }); 
});

router.post('/dailynew', function(req, res, next) {
  var sql = "INSERT INTO daily_table (part, ranking, project, type, date1, date2, date3, date4, tester, status, memo1, memo2) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let arr = req.body;
  // 첫 번째 요소 삭제
  arr.shift();
  db.query(sql,arr,function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
      console.log(err)
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  }); 
});

router.post('/dailydel', function(req, res, next) {
  var sql = "delete from daily_table where id = ?";
  arr = req.body[0];
  db.query(sql,arr,function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
      console.log(err)
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  });
});

router.post('/dailyupdate', function(req, res, next) {
  let arr = req.body;
  // 두 번째 요소를 맨 뒤로 보내기
  arr.push(arr.shift());
  var sql = "UPDATE daily_table SET part = ?, ranking = ?, project = ?, type = ?, date1 = ?, date2 = ?, date3 = ?, date4 = ?, tester = ?, status = ?, memo1 = ?, memo2 = ? WHERE id = ?";
  db.query(sql,arr,function(err, rows, fields) {
    if (err){
      res.status(500).json({ err: err });
      console.log(err)
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  });
});

//admin관련
router.post('/makeuser', function(req, res, next) {
  let arr = req.body;
  arr[1] = modules.encpassword(arr[1])
  sql =  `INSERT INTO user (id, pw, name, level) VALUES (?, ?, ?, ?)`
  db.query(sql,arr,function(err, rows, fields) {
    if (err){
      console.log(err.message)
      console.log(err.sqlMessage)
      res.status(500).json({ errno: err.errno, message: err.message, sqlMessage: err.sqlMessage });      
    }
    else{
      res.status(200).json({ success: "resresult" });
    }
  });
});

//setting
router.post('/mypassword', function(req, res, next) {
  console.log(req.user.id);
  if(req.body[1] != req.body[2]){
    res.status(500).json({ errno: 9999, message: "신규 패스워드를 다시 입력해주세요.", sqlMessage: '입력 에러.' }); 
  }else if(req.body[0] == req.body[2]){
    res.status(500).json({ errno: 9999, message: "기존 패스워드와 신규 패스워드가 같습니다.", sqlMessage: '입력 에러.' }); 
  }else{
    db.query('select * from user where id=?', [req.user.id], (err, rows)=>{
      console.log(rows)
      if (err){
        res.status(500).json({ errno: err.errno, message: err.message, sqlMessage: err.sqlMessage });      
      }
      else{
        if(rows[0].pw != modules.encpassword(req.body[0])){
          console.log(rows.pw,modules.encpassword(req.body[0]))
          res.status(500).json({ errno: 9999, message: "기존 패스워드를 확인해주세요.", sqlMessage: '입력 에러.' });
        }else{
          db.query('update user set pw=?, lastlogin=NOW() where id=?',[modules.encpassword(req.body[1]), req.user.id], ()=>{
            if (err){
              res.status(500).json({ errno: err.errno, message: err.message, sqlMessage: err.sqlMessage });      
            }
            else{
              res.status(200).json({ success: "resresult" });
            };
          })
        };
      };
    })
  }
});


module.exports = router;