var express = require('express');
var router = express.Router();

const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'skcncmanagerdb'
});

connection.connect();

//connection.end();

/* GET home page. */
router.get('/', function(req, res, next) {
  connection.query('SELECT * from project_table ORDER BY 1 DESC', (error, rows, fields) => {
    if (error) throw error;
    connection.query(`(SELECT project_code FROM project_table order by 1 desc LIMIT 1) union (select service_code from project_table order by 1 desc LIMIT 1) union (select manage_code from project_table where new_inspectiontype='A' order by 1 desc LIMIT 1) union (select manage_code from project_table where new_inspectiontype='B' order by 1 desc LIMIT 1) union (select manage_code from project_table where new_inspectiontype='C' order by 1 desc LIMIT 1) union (select manage_code from project_table where new_inspectiontype='D' order by 1 desc LIMIT 1) union (select manage_code from project_table where new_inspectiontype='E' order by 1 desc LIMIT 1) union (select manage_code from project_table where new_inspectiontype='F' order by 1 desc LIMIT 1)`, (error, serviceCodes, fields) => {
      if (error) throw error;
        var codefamily = []
        for( const key of serviceCodes){
          serviceCodes = key.project_code;
          var currentNumber = parseInt(serviceCodes.substr(1), 10); // 'S006'에서 006을 추출하고 정수로 변환
          var newNumber = currentNumber + 1;
          var newCode = ('000' + newNumber).slice(-3); // 숫자를 다시 문자열로 변환하고 'S'를 추가
          codefamily.push(newCode)
        };
        
      res.render('index', { title: 'SK C&C MANAGER', dbtest: rows, method: "get", codefamily: codefamily });
    }); 
  });    
});

router.post('/', (req, res, next) => {
  var sql = "INSERT INTO project_table (project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, open_date, relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  var values = [];
  //받은 파라미터를 values에 추가
  for (const key in req.body){
    if (key === 17 || key === 18 || key === 19 || key === 21 || key === 22 || key === 23 || key === 24 || key === 25 || key === 26 || key === 27 || key === 29) {
      values.push(Boolean(req.body[key]))
    } else {
      values.push(String(req.body[key]))
    };
  };
  //쿼리 실행
  connection.query(sql,values,function(err, rows, fields) {
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

module.exports = router;