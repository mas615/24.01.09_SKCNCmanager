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
          position: fixed; /* 고정 위치로 설정 */
          bottom: 20px; /* 아래에서 20px 떨어진 위치에 표시 */
          right: 20px; /* 오른쪽에서 20px 떨어진 위치에 표시 */
          z-index: 999; /* 다른 요소 위에 표시 */
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
        body = `<button id="clearFiltersButton">저장!</button><br><div id="example"></div>`;
        script = `<script src="/handsontable/handsontable.full.js"></script>
          <script>
          // 서버에서 전달된 데이터를 EJS 템플릿에서 사용
          var codefamily = ${JSON.stringify(serviceCodes[0])};
          const data = [['P'+codefamily.project_code,'S'+codefamily.service_code]];
          
          //빈 raw용 while문
          datanum = 0;
          while(datanum < 29){
            data[0].push(null);
            datanum++;
          };
          console.log(data);  
          let changedkey = new Set();
          let postvalue = [];
      
          // Handsontable을 초기화하고 옵션 설정
          const container = document.getElementById('example');
          const hot = new Handsontable(container, {
              data: data,
              colHeaders: ['프로젝트코드','서비스코드','관리코드','프로젝트명','신규 점검유형','기존 점검유형','open일','관계사명','담당업체','담당부서','담당자','연락처','담당업체','담당부서','담당자','연락처','모의해킹','소스코드 진단','인프라 진단','비고','신규투자(회사)','사업팀요청(자체투자)','사내시스템','대외인증','그룹공통','사업팀요청(관계사)','멤버사진단','23년관리코드','23년이관현황'],
              rowHeaders: true,
              licenseKey: 'non-commercial-and-evaluation',
              fillHandle: false,
              sortIndicator: true, // 정렬된 열 표시 활성화
              columnSorting: true, // 정렬 기능 활성화
              dropdownMenu: true, // 필터 메뉴 활성화
              filters: true, // 필터 활성화
              columns: [{},{},{},{},{type: 'dropdown',source: ['A', 'B', 'C', 'D','E','F']},{type: 'dropdown',source: ['A', 'B', 'C', 'D','E','F']},{type: "date", dateFormat: 'YYYY.MM.DD'},{},{},{},{},{},{},{},{},{},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{},{type: "checkbox"}
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
                      console.log(changes);
                        changes.forEach(([row, prop, oldValue, newValue]) => {
                            if (prop === 4) {
                                // '신규 점검유형'이 변경되었을 때, '기존 점검유형' 열을 변경
                                const rowIndex = row;
                                const oldValue = hot.getDataAtCell(rowIndex, 4);
            
                                // 예를 들어, '신규 점검유형'이 'A'라면 '기존 점검유형'을 '기존 A'로 변경
                                if (oldValue === 'A') {
                                    hot.setDataAtCell(rowIndex, 2, 'A${serviceCodes[0].manage_code_A}');
                                } else if (oldValue === 'B') {
                                    hot.setDataAtCell(rowIndex, 2, 'B${serviceCodes[0].manage_code_B}');
                                } else if (oldValue === 'C') {
                                    hot.setDataAtCell(rowIndex, 2, 'C${serviceCodes[0].manage_code_C}');
                                } else if (oldValue === 'D') {
                                    hot.setDataAtCell(rowIndex, 2, 'D${serviceCodes[0].manage_code_D}');
                                } else if (oldValue === 'E') {
                                    hot.setDataAtCell(rowIndex, 2, 'E${serviceCodes[0].manage_code_E}');
                                } else if (oldValue === 'F') {
                                    hot.setDataAtCell(rowIndex, 2, 'F${serviceCodes[0].manage_code_F}');
                                }
                                // 필요에 따라 다른 경우에 대한 처리 추가
                            }
                            // 다른 열에 대한 변경 처리도 추가할 수 있음
                        });                    
                  }
              },
          });

          //필터링 해제 및 저장함수
          function clearFilters() {
            hot.getPlugin('filters').clearConditions();
            hot.getPlugin('filters').filter()
            realhotdata = hot.getData();
            console.log('리얼핫데이타',realhotdata);
            console.log('체인지드프라이머리키',changedkey);
            for(const realhotdatakey of realhotdata){
              for(const realhotdatakeykey in realhotdatakey){
                if(realhotdatakey[realhotdatakeykey] === true){
                  realhotdatakey[realhotdatakeykey] = 'true';
                }else if(realhotdatakey[realhotdatakeykey] === false){
                  realhotdatakey[realhotdatakeykey] = 'false';
                }else if(realhotdatakey[realhotdatakeykey] === ''){
                  realhotdatakey[realhotdatakeykey] = null;
                };
              };
              postvalue.push(realhotdata);
            };
            fetch('/m/api/insert/project', {
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
              const sanitizedRowData = rowData.map(row => (row === undefined ? null : row));

              //수정사항 프라이머리키 저장
              for(const rowDatakey of rowData){
                changedkey.add(rowDatakey[0]);
              };                 
          };
          hot.addHook('afterUndo', function() {
              console.log('Ctrl+Z를 눌렀습니다. 되돌리기가 수행되었습니다.');
              // 로직을 바꿔서 쓸모 없어져 버렸지만 언제 쓰일지 몰라서 주석처리
              // editlog2.unshift(editlog.splice(0,1)[0]);
              // console.log(editlog);
          });
          hot.addHook('afterRedo', function() {
              console.log('Ctrl+Y를 눌렀습니다. 다시 실행이 수행되었습니다.');
              // 로직을 바꿔서 쓸모 없어져 버렸지만 언제 쓰일지 몰라서 주석처리
              // editlog.unshift(editlog2.splice(0, 1)[0]);
              // console.log(editlog2);
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

          hot.addHook('afterRender', function() {
            const container = hot.rootElement.parentNode;
            const button = document.getElementById('clearFiltersButton');
            container.appendChild(button);
          });

          //버튼연결
          document.getElementById('clearFiltersButton').addEventListener('click', function() {
            clearFilters();
          });
      </script>
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
      }
      else{
        console.log(rows.insertId);
      }
    });
  };
  res.status(200).json({ success: "resresult" });
});

module.exports = router;