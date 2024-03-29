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
  var head = `<link href="/handsontable/handsontable.full.css" rel="stylesheet">`;
  connection.query('SELECT seq, project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, DATE_FORMAT(open_date,"%Y-%m-%d"), relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project from project_table ORDER BY 1 DESC', (error, rows, fields) => {
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
        const data = [];
        for(const rowskey of rows){
          const datadata = ['false'];
          for(const rowskeykey in rowskey){            
            datadata.push(rowskey[rowskeykey]);
          };
          data.push(datadata);
        };
        body = `<button id="clearFiltersButton">저장!</button><br><div id="example"></div>`;
        script = `<script src="/handsontable/handsontable.full.js"></script>
          <script>
          // 서버에서 전달된 데이터를 EJS 템플릿에서 사용
          const data = ${JSON.stringify(data)};
          let edited = {};
          let edited2 = {};
          let editlog = [];
          let editlog2 = [];
          let changedkey = new Set();
          let postvalue = [];
      
          // Handsontable을 초기화하고 옵션 설정
          const container = document.getElementById('example');
          const hot = new Handsontable(container, {
              data: data,
              colHeaders: ['삭제','프라이머리키','프로젝트코드','서비스코드','관리코드','프로젝트명','신규 점검유형','기존 점검유형','open일','관계사명','담당업체','담당부서','담당자','연락처','담당업체','담당부서','담당자','연락처','모의해킹','소스코드 진단','인프라 진단','비고','신규투자(회사)','사업팀요청(자체투자)','사내시스템','대외인증','그룹공통','사업팀요청(관계사)','멤버사진단','23년관리코드','23년이관현황'],
              rowHeaders: true,
              licenseKey: 'non-commercial-and-evaluation',
              fillHandle: false,
              sortIndicator: true, // 정렬된 열 표시 활성화
              columnSorting: true, // 정렬 기능 활성화
              dropdownMenu: true, // 필터 메뉴 활성화
              filters: true, // 필터 활성화
              columns: [{type: "checkbox",className: "htCenter"},{ readOnly: true },{},{},{},{},{},{},{type: "date", dateFormat: 'YYYY-MM-DD'},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
              ],
              afterPaste: (data, coords) => {
                  const a = coords[0].startRow;
                  const b = coords[0].endRow;
                  const rowIndices = [];
                  for (let i = a; i <= b; i++) {
                      // 반복하고자 하는 동작 수행
                      rowIndices.push(i);
                  };
                  const rowDataToSend = rowIndices.map(rowIndex => hot.getDataAtRow(rowIndex));

                  sendRowDataToServer(rowDataToSend);
              },
              afterChange: (changes, source) => {
                  if (source === 'edit') {
                      const rowIndices = changes.map(change => change[0]);
                      const rowDataToSend = rowIndices.map(rowIndex => hot.getDataAtRow(rowIndex));

                      sendRowDataToServer(rowDataToSend);
                  }
              },
          });

          //필터링 해제함수
          function clearFilters() {
            hot.getPlugin('filters').clearConditions();
            hot.getPlugin('filters').filter()
            realhotdata = hot.getData();
            console.log('리얼핫데이타',realhotdata);
            console.log('체인지드프라이머리키',changedkey);
            for(const realhotdatakey of realhotdata){
              if (changedkey.has(realhotdatakey[0])) {
                  // 조건을 충족하는 경우의 처리
                  console.log('일치', realhotdatakey[0]);
                  postvalue.push(realhotdatakey);
              } else {
                  // 조건을 충족하지 않는 경우의 처리
                  //console.log('i와 k 배열의 값이 모두 다릅니다.');
              }
            };
            console.log('포스트벨류',postvalue);
            fetch('/m/insert/update', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ rowData: postvalue }),
              })
              .then(response => response.json())
              .then(data => {
                  console.log(data);
                  alert('저장 성공');
                  changedkey = new Set();            
                  postvalue = [];
                  location.reload();

              })
              .catch(error => {
                  console.error('Error updating row data:', error);
                  alert('저장 실패, 다시 시도해주세요.');
              });         
            };
      
          // Function to send row data to the server
          function sendRowDataToServer(rowData) {
            console.log('로데이타',rowData)     
              const sanitizedRowData = rowData.map(row => (row === undefined ? null : row));

              //수정사항 프라이머리키 저장
              hotdata = hot.getData();
              console.log('핫데이타',hotdata);
              for(const rowDatakey of rowData){
                changedkey.add(rowDatakey[0]);
              };
              console.log('체인지드프라이머리키',changedkey);
              for(const hotdatakey of hotdata){
                if (changedkey.has(hotdatakey[0])) {
                    // 조건을 충족하는 경우의 처리
                    console.log('일치', hotdatakey[0]);
                } else {
                    // 조건을 충족하지 않는 경우의 처리
                    //console.log('i와 k 배열의 값이 모두 다릅니다.');
                }
              };

              //수정사항 전체를 프라이머리키와 함께 저장
              for(const rowDatakey of rowData){
                edited[rowDatakey[0]] = rowDatakey;
              };              
              var funedited = Object.assign({}, edited);
              editlog.unshift(funedited);
              //console.log(editlog);                   
          };
          hot.addHook('afterUndo', function() {
              console.log('Ctrl+Z를 눌렀습니다. 되돌리기가 수행되었습니다.');
              //원하는 동작을 추가
              editlog2.unshift(editlog.splice(0,1)[0]);
              console.log(editlog);
          });
          hot.addHook('afterRedo', function() {
              console.log('Ctrl+Y를 눌렀습니다. 다시 실행이 수행되었습니다.');
              // 여기에 원하는 동작을 추가하세요
              // 예를 들어, 이전 작업을 재실행하는 등의 로직을 추가할 수 있습니다.
              editlog.unshift(editlog2.splice(0, 1)[0]);
              console.log(editlog2);
          });
          newrowcount = 0;
          hot.addHook('afterCreateRow', function(index, amount, source) {
            console.log('인덱스',index);            
            // 새로운 행이 추가될 때마다 첫 번째 셀에 특정 데이터를 설정
            hot.setDataAtCell(index, 0, 'A'+newrowcount);
            hot.setDataAtCell(index, 1, '이 행은 저장되지 않습니다.');
            // changedkey.add('A'+newrowcount);
            // newrowcount ++;
            // hot.alter('remove_row', index);
          });

          //버튼연결
          document.getElementById('clearFiltersButton').addEventListener('click', function() {
            clearFilters();
          });
      </script>
      `;
      res.render('tmpgrid', { title : "title", head : head, body : body, script : script});
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

router.post('/update', function(req, res, next) {
  console.log(req.body.rowData);
  resresult ='';
  sql = `UPDATE project_table SET project_code = ?, service_code = ?, manage_code = ?, project_name = ?, new_inspectiontype = ?, old_inspectiontype = ?, open_date = ?, relative_comp = ?, comp1 = ?, part1 = ?, manager1 = ?, manager1_phone = ?, comp2 = ?, part2 = ?, manager2 = ?, manager2_phone = ?, pentest = ?, source_code = ?, infra = ?, note = ?, check1 = ?, check2 = ?, check3 = ?, check4 = ?, check5 = ?, check6 = ?, check7 = ?, old_manage_code = ?, old_project = ? WHERE seq = ?`;
  for(const key of req.body.rowData){
    del = key.shift();
    seq = key.shift();
    key.push(seq);
    if (!isNaN(parseInt(seq))) {
        console.log("숫자로 시작하는 요소:", seq);
        console.log(del);     
        connection.query(sql,key,function(err, result) {
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