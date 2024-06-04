var express = require('express');
var router = express.Router();
var db = require('../../db');

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
  console.log(req.body);  
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
  console.log(req.body);
  res.status(200).json({ success: "성공" });
});


module.exports = router;