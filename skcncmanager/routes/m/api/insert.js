var express = require('express');
var router = express.Router();
var db = require('../../db');

router.post('/project', (req, res, next) => {
    var sql = "INSERT INTO project_table (project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, open_date, relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project, del) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'false')";
    var values = [];
    for(const reqkey of req.body.rowData[0]){
      db.query(sql,reqkey,function(err, rows, fields) {
        if (err){
          console.log(err);
        }
        else{
          console.log(rows.insertId);
        }
      });
    };
    res.status(200).json({ success: "resresult" });
});

router.post('/pentest', (req, res, next) => {
  var sql = "INSERT INTO penetrationtest (manage_code, status, url, urlcount, pentester, testcount, manday, startdate, enddate, actdate, memo) VALUES (?, '1', ?, ?, ?, 0, ?, ?, ?, ?, ?)";
  //for문 돌려서 넣기 + 에러나면 에러 카운트 보내기 + for문 다돌면 그때 res보내기.
    db.query(sql,req.body.rowData[0][0],function(err, rows, fields) {
      if (err){
        res.status(500).json({ success: err.sqlMessage });
      }
      else{
        res.status(200).json({ success: req.body.rowData[0][0][0] });
      }
    });
});

router.post('/vulner', function(req, res, next) { 
  sql = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, memo, vulnerspot, lastdate, status, vulnermanager, vulnernote, vulnermemo) VALUES (?,?,?,?,?,?,?,?,?,?)';
  sql2 = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, memo, vulnerspot, lastdate, status, vulnermanager, vulnernote, vulnermemo) VALUES (?,?,?,?,?,?,?,?,?,?)';

  for(const bodykey of req.body.rowData){
    db.query(sql, bodykey, (err, rows, fields) => {
      if(err){
        console.log(err);
      }else{
        console.log(rows);
      };    
    });
  };
  
  res.status(200).json({ success: "ㅎㅇㅎㅇ" });
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

module.exports = router;