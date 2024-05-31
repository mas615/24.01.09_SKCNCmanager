var express = require('express');
var router = express.Router();
var db = require('../db');

// const mysql      = require('mysql2');
// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'skcncmanagerdb'
// });

// connection.connect();

//connection.end();

/* GET home page. */
router.get('/', function(req, res, next) {
  var head = `
    <link href="/handsontable/handsontable.full.css" rel="stylesheet">
    <style>
      /* "저장!" 버튼을 고정 위치로 설정 */
      #clearFiltersButton {
      }
    </style>`;
  sql = `SELECT (SELECT project_code FROM project_table ORDER BY 1 DESC LIMIT 1) as project_code, (SELECT service_code FROM project_table ORDER BY 1 DESC LIMIT 1) as service_code, (SELECT manage_code FROM project_table WHERE new_inspectiontype='A' ORDER BY 1 DESC LIMIT 1) as manage_code_A,(SELECT manage_code FROM project_table WHERE new_inspectiontype='B' ORDER BY 1 DESC LIMIT 1) as manage_code_B,(SELECT manage_code FROM project_table WHERE new_inspectiontype='C' ORDER BY 1 DESC LIMIT 1) as manage_code_C,(SELECT manage_code FROM project_table WHERE new_inspectiontype='D' ORDER BY 1 DESC LIMIT 1) as manage_code_D,(SELECT manage_code FROM project_table WHERE new_inspectiontype='E' ORDER BY 1 DESC LIMIT 1) as manage_code_E,(SELECT manage_code FROM project_table WHERE new_inspectiontype='F' ORDER BY 1 DESC LIMIT 1) as manage_code_F`;
    db.query(sql, (error, serviceCodes, fields) => {
      if (error) throw error;
        console.log(serviceCodes[0])
        for(let servicecodeskey in serviceCodes[0]){
          newcodes = serviceCodes[0][servicecodeskey];
          if (typeof serviceCodes[0][servicecodeskey] === 'string' && /^[a-zA-Z]/.test(serviceCodes[0][servicecodeskey])) {
            // 알파벳을 제거하고 정수로 변환
            nostringint = parseInt(serviceCodes[0][servicecodeskey].replace(/[^0-9]/g, ''), 10);
            serviceCodes[0][servicecodeskey] = ("000"+(nostringint+1)).slice(-3);
          };
        };
        console.log(serviceCodes[0])
        // for( const key of serviceCodes){
        //   serviceCodes = key.project_code;
        //   var currentNumber = parseInt(serviceCodes.substr(1), 10); // 'S006'에서 006을 추출하고 정수로 변환
        //   var newNumber = currentNumber + 1;
        //   var newCode = ('000' + newNumber).slice(-3); // 숫자를 다시 문자열로 변환하고 'S'를 추가
        //   codefamily.push(newCode)
        // };
        // console.log(codefamily);
        body = `현재 관리코드 + 1<div id="example2"></div><br><button id="addButton">행 추가</button> <button id="clearFiltersButton">저장!</button><div id="example"></div>`;
        script = `<script src="/handsontable/handsontable.full.js"></script>
          <script>
          // 서버에서 전달된 데이터를 EJS 템플릿에서 사용
          var codefamily = ${JSON.stringify(serviceCodes[0])};</script>
          <script src="/js/js_insert.js"></script>

      `;
      res.render('tmpgrid', { title : "Project - 추가", head : head, body : body, script : script});
    }); 
  }); 

router.post('/', (req, res, next) => {
  var sql = "INSERT INTO project_table (project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, open_date, relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project, del) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'false')";
  var values = [];
  //받은 파라미터를 values에 추가
  //console.log(req.body.rowData[0]);
  for(const reqkey of req.body.rowData[0]){
    db.query(sql,reqkey,function(err, rows, fields) {
      if (err){
        console.log(err);
        res.status(500).json({ "실패": err });
      }
      else{
        console.log(rows.insertId);
        res.status(200).json({ success: "resresult" });
      }
    });
  };  
});

module.exports = router;