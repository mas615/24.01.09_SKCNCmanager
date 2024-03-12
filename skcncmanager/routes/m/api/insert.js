var express = require('express');
var router = express.Router();
var db = require('../../db');

router.post('/project', (req, res, next) => {
    var sql = "INSERT INTO project_table (project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, open_date, relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project, del) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'false')";
    var values = [];
    //받은 파라미터를 values에 추가
    //console.log(req.body.rowData[0]);
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
  var values = []
  console.log('벨류',values);
  //받은 파라미터를 values에 추가
  console.log('리퀘스트 바디',req.body.rowData[0]);
  //null체크
  for (const key in req.body){
    if(req.body[key]==''){
      values.push(null);
    }else{
      values.push(req.body[key]);
    };        
  };
  //for문 돌려서 넣기
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
  res.status(200).json({ success: req.body.rowData[0][0][0] });
});

router.post('/vulner', function(req, res, next) { 
  body='';    
  sql = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, memo, vulnerspot, lastdate, status, vulnermanager, vulnernote, vulnermemo) VALUES (?,?,?,?,?,?,?,?,?,?)';
  sql2 = 'INSERT INTO penetrationtest_vulner (manage_code, testcount, vulner, memo, vulnerspot, lastdate, status, vulnermanager, vulnernote, vulnermemo) VALUES (?,?,?,?,?,?,?,?,?,?)';
  values = [];
  for(const bodykey of req.body.rowData){
    console.log(bodykey);
    db.query(sql, bodykey, (err, rows, fields) => {
      if(err){
        console.log(err);
      }else{
        console.log(rows);
      };
    });
  };
  // console.log('testcount : ',req.body[2]);
  // if(req.body[2] !== '0'){
  //   console.log('if로 갔을경우.');
  //   connection.query(sql,values, (err, rows, fields) => {
  //     if (err){
  //       console.log(err);
  //     }
  //     else{
  //       console.log(rows.insertId);
  //     };
  //     values[1] = 0; 
  //     connection.query(sql2,values, (err, rows, fields) => {
  //       if (err){
  //         console.log(err);
  //       }
  //       else{
  //         console.log(rows.insertId);
  //       }
  //       res.redirect(302, `/m/penetrationtest/detail?code=${req.body[1]}&testcount=${req.body[2]}`);
  //     });
  //   });
  // }else{
  //   console.log('else로 갔을경우.');
  //   connection.query(sql,values, (err, rows, fields) => {
  //     if (err){
  //       console.log(err);
  //     }
  //     else{
  //       console.log(rows.insertId);
  //     }
  //     res.redirect(302, `/m/penetrationtest/detail?code=${req.body[1]}&testcount=${req.body[2]}`);
  //   });      
  // };    
});

module.exports = router;