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
  console.log('리퀘스트 바디',req.body);
  for (const key in req.body){
    if(req.body[key]==''){
      values.push(null);
    }else{
      values.push(req.body[key]);
    };        
  };
  req.body.rowData[0][0][0] = req.body.rowData[0][0][0].substring(1,5);
  console.log(req.body.rowData[0][0][0]);
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
  //connection.end();
});

module.exports = router;