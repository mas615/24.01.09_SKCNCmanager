var express = require('express');
var router = express.Router();
var db = require('../db');
const jwt = require('jsonwebtoken');

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
  var head = ``; 
  console.log(req.user.name);
  sql = `SELECT project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, DATE_FORMAT(open_date,"%Y.%m.%d"), relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project FROM project_table ORDER BY seq DESC;`;
  if(req.query.del == 'all'){
    sql = `SELECT project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, DATE_FORMAT(open_date,"%Y.%m.%d"), relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project from project_table ORDER BY 1 DESC`;
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
        
        // 권한 검증
        const SECRET_KEY = 'SKCNCMAJUNYOUNG';
        const token = req.cookies.auth;
        body = '';
        jwt.verify(token, SECRET_KEY, (err, data) => {
          if (err) {
            return res.sendStatus(403);
          };
          if(data.level >= 1){
            body += `<button id="clearFiltersButton2" onclick="location.href='./projectsedit'">수정</button> <button id="clearFiltersButton" onclick="location.href='./insert'">추가</button>`;
          }; 
        });
        // 권한 검증 끝

        body += `<div id="example"></div>`;
        script = `<script src="/handsontable/handsontable.full.js"></script>
          <script>
          // 서버에서 전달된 데이터를 EJS 템플릿에서 사용
          const data = ${JSON.stringify(data)};
          let changedkey = new Set();
          let postvalue = [];
      
          // Handsontable을 초기화하고 옵션 설정
          const container = document.getElementById('example');
          const hot = new Handsontable(container, {
              data: data,
              colHeaders: ['프로젝트코드','서비스코드','관리코드','프로젝트명','신규 점검유형','기존 점검유형','open일','관계사명','담당업체','담당부서','담당자','연락처','담당업체','담당부서','담당자','연락처','모의해킹','소스코드 진단','인프라 진단','비고','신규투자(회사)','사업팀요청(자체투자)','사내시스템','대외인증','그룹공통','사업팀요청(관계사)','멤버사진단','23년관리코드','23년이관현황'],
              rowHeaders: true,
              licenseKey: 'non-commercial-and-evaluation',
              fillHandle: false, //셀 드래그 방지
              sortIndicator: true, // 정렬된 열 표시 활성화
              columnSorting: true, // 정렬 기능 활성화
              dropdownMenu: true, // 필터 메뉴 활성화
              filters: true, // 필터 활성화
              // hiddenColumns: {
              //   columns: [0], // 숨길 열의 인덱스를 지정
              //   indicators: true // 열이 숨겨졌음을 나타내는 표시기 표시
              // },
              columns: [{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{type: 'dropdown',source: ['A', 'B', 'C', 'D'],readOnly: true},{readOnly: true},{type: "date", dateFormat: 'YYYY.MM.DD',readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true}
              ],
          });

      </script>
      `;
      res.render('tmpgrid3', { title : "Project", head : head, body : body, script : script, user : req.user.username});
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

router.post('/update', function(req, res, next) {
  console.log(req.body.rowData);
  resresult ='';
  sql = `UPDATE project_table SET del=?, project_code = ?, service_code = ?, manage_code = ?, project_name = ?, new_inspectiontype = ?, old_inspectiontype = ?, open_date = ?, relative_comp = ?, comp1 = ?, part1 = ?, manager1 = ?, manager1_phone = ?, comp2 = ?, part2 = ?, manager2 = ?, manager2_phone = ?, pentest = ?, source_code = ?, infra = ?, note = ?, check1 = ?, check2 = ?, check3 = ?, check4 = ?, check5 = ?, check6 = ?, check7 = ?, old_manage_code = ?, old_project = ? WHERE seq = ?`;
  for(const key of req.body.rowData){
    seq = key.shift();
    key.push(seq);
    if (!isNaN(parseInt(seq))) {
        console.log("숫자로 시작하는 요소:", seq);
        db.query(sql,key,function(err, result) {
          if (err){
            console.log(err);
          }
          else{
            console.log("Number of rows updated:", result.affectedRows); // 업데이트된 행의 수 출력
            resresult += result.affectedRows;
          }
        });
        // 숫자로 시작하는 요소에 대한 처리
    }
    // 첫 번째 요소가 'A'로 시작하는지 확인
    else if (typeof firstElement === 'string' && firstElement.startsWith('A')) {
        console.log("'A'로 시작하는 요소:", seq);
        // 'A'로 시작하는 요소에 대한 처리
    }
    // 숫자 또는 'A'로 시작하지 않는 경우
    else {
        console.log("기타 요소:", seq);
        // 기타 요소에 대한 처리l
    };
  }
  console.log(Object.keys(req.body.rowData).length);
  count = Object.keys(req.body.rowData).length;  
  res.status(200).json({ success: resresult });
});

module.exports = router;