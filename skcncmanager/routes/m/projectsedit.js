var express = require('express');
var router = express.Router();
var db = require('../db');
//jwt 검증구간
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'SKCNCMAJUNYOUNG';
function verifyJWT(req, res, next) {
  const token = req.cookies.auth;
  if (!token) {
      return res.redirect('/');
  }

  jwt.verify(token, SECRET_KEY, (err, data) => {
      if (err) {
          return res.redirect('/');
      }
      if(data.level < 1){
        return res.redirect('/');
      };
      next();
  });
};
router.use(verifyJWT);
//jwt검증구간 끝

router.get('/', function(req, res, next) {
  var head = `
    <link href="/handsontable/handsontable.full.css" rel="stylesheet">`; 
  console.log(req.query.del);
  sql = `SELECT seq, null, project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, DATE_FORMAT(open_date,"%Y.%m.%d"), relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project FROM project_table ORDER BY seq DESC;`;
  if(req.query.del == 'all'){
    sql = `SELECT seq, null, project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, DATE_FORMAT(open_date,"%Y.%m.%d"), relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project from project_table ORDER BY 1 DESC`;
  };
  db.query(sql, (error, rows, fields) => {
    if (error) throw error;
        const data = [];
        for(const rowskey of rows){
          const datadata = [];
          for(const rowskeykey in rowskey){            
            datadata.push(rowskey[rowskeykey]);
          };
          data.push(datadata);
        };
        body = `<button id="clearFiltersButton">저장!</button><br><div id="example"></div>`;
        script = `
          <script src="/handsontable/handsontable.full.js"></script>
          <script>const data = ${JSON.stringify(data)};</script>
          <script src="/js/js_projectedit.js"></script>`;
      res.render('tmpgrid3', { title : "Project - 수정", head : head, body : body, script : script, user : req.user.username});
  });    
});

router.post('/', (req, res, next) => {
  var sql = "INSERT INTO project_table (project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, open_date, relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var values = [];
  //받은 파라미터를 values에 추가
  console.log(req.body)
  for (const key in req.body){
    if (key === 17 || key === 18 || key === 19 || key === 21 || key === 22 || key === 23 || key === 24 || key === 25 || key === 26 || key === 27 || key === 29) {
      values.push(Boolean(req.body[key]))
    } else {
      values.push(String(req.body[key]))
    };
  };
  //쿼리 실행
  db.query(sql,values,function(err, rows, fields) {
    if (err){
      console.log(err);
    }
    else{
      console.log(rows.insertId);
    }
  });
  //302
  res.redirect(302, "/m/insert");
});

router.post('/updates', function(req, res, next) {
  console.log(req.body.rowData);
  sql = `UPDATE project_table SET del=?, project_code = ?, service_code = ?, manage_code = ?, project_name = ?, new_inspectiontype = ?, old_inspectiontype = ?, open_date = ?, relative_comp = ?, comp1 = ?, part1 = ?, manager1 = ?, manager1_phone = ?, comp2 = ?, part2 = ?, manager2 = ?, manager2_phone = ?, pentest = ?, source_code = ?, infra = ?, note = ?, check1 = ?, check2 = ?, check3 = ?, check4 = ?, check5 = ?, check6 = ?, check7 = ?, old_manage_code = ?, old_project = ? WHERE seq = ?`;
  for(const key of req.body.rowData){
    seq = key.shift();
    key.push(seq);
    db.query(sql,key,function(err, result) {
      if (err){
        console.log(err);
      }
    });
  }
  res.status(200).json({ "성공": "성공" });
  //db.query('INSERT INTO log_table (ip, sqls, value) VALUES (?,?,?)',[req.ip, sql, JSON.stringify(key)]); //로그 저장
});

router.post('/update', function(req, res, next) {
  console.log(req.body.rowData);
  const updateSql = `UPDATE project_table SET del=?, project_code = ?, service_code = ?, manage_code = ?, project_name = ?, new_inspectiontype = ?, old_inspectiontype = ?, open_date = ?, relative_comp = ?, comp1 = ?, part1 = ?, manager1 = ?, manager1_phone = ?, comp2 = ?, part2 = ?, manager2 = ?, manager2_phone = ?, pentest = ?, source_code = ?, infra = ?, note = ?, check1 = ?, check2 = ?, check3 = ?, check4 = ?, check5 = ?, check6 = ?, check7 = ?, old_manage_code = ?, old_project = ? WHERE seq = ?`;
  const deleteSql = `DELETE FROM project_table WHERE seq = ?`;
  const logsql = [];
  const logvalue = [];
  let logcount = 0;
  
  const promises = req.body.rowData.map((key) => {
    const seq = key.shift();
    console.log(key);
    if (key[0] === 'true') {  // key의 첫번째 요소가 true이면 삭제
      return new Promise((resolve, reject) => {
        db.query(deleteSql, [seq], (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            logsql.push(`${logcount}//${deleteSql}`);
            logvalue.push(`${logcount}//[${seq}]`);
            logcount += 1;
            resolve(result);
          }
        });
      });
    } else {  // key의 첫번째 요소가 true가 아니면 업데이트
      key.push(seq);
      return new Promise((resolve, reject) => {
        db.query(updateSql, key, (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
            logsql.push(`${logcount}//${updateSql}`);
            logvalue.push(`${logcount}//[${key}]`);
            logcount += 1;
          }
        });
      });
    }
  });

  Promise.all(promises)
    .then((results) => {
      const logsqlString = logsql.join(', ');
      const logvalueString = logvalue.join(', ');
      db.query('INSERT INTO log_table (ip, sqls, value) VALUES (?,?,?)', [req.ip, logsqlString, logvalueString], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ "오류": "로그 삽입 중 오류 발생", "details": err });
        } else {
          res.status(200).json({ "성공": "성공" });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ "오류": "오류 발생", "details": error });
    });
});

module.exports = router;