var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var db = require('../../db');
//라우팅

router.get('/', function(req, res, next) {
    sql = 'select manage_code, project_name from project_table where not exists (select 1 from penetrationtest where project_table.manage_code = penetrationtest.manage_code) AND del = "false" order by manage_code';
    db.query(sql, (error, projectcode, fields) => {
        var head = `<link href="/handsontable/handsontable.full.css" rel="stylesheet">`;
        var body = `<button id="clearFiltersButton" onclick="clearFilters()">추가!</button><div id="example"></div>`;
        var dropdata = [];
        for(const projectcodekey of projectcode){
          pushdata = `[${projectcodekey.manage_code}] : ${projectcodekey.project_name}`;
          dropdata.push(pushdata);
        };
        script = `<script src="/handsontable/handsontable.full.js"></script>
          <script>
          // 서버에서 전달된 데이터를 EJS 템플릿에서 사용
          const data = [[]];

          //빈 raw용 while문
          datanum = 0;
          while(datanum < 11){
            data[0].push(null);
            datanum++;
          };
      
          // Handsontable을 초기화하고 옵션을 설정합니다.
          const container = document.getElementById('example');
          const hot = new Handsontable(container, {
              data: data,
              colHeaders : ["진단대상", "URL", "URL수", "진단자", "진단공수", "진단시작일", "진단종료일", "조치예정일", "비고"],
              rowHeaders : true,
              licenseKey : 'non-commercial-and-evaluation',
              columns : [{width: 300, type: 'dropdown',source:${JSON.stringify(dropdata)}},{},{type: 'numeric'},{},{type: 'numeric'},{type: "date", dateFormat: 'YYYY.MM.DD'},{type: "date", dateFormat: 'YYYY.MM.DD'},{type: "date", dateFormat: 'YYYY.MM.DD'},{}],
          });

          var postvalue = [];
          //필터링 해제 및 저장함수
          function clearFilters() {
            realhotdata = hot.getData();
            for(const realhotdatakey of realhotdata){
              for(const realhotdatakeykey in realhotdatakey){
                if(realhotdatakey[realhotdatakeykey] === true){
                  realhotdatakey[realhotdatakeykey] = 'true';
                }else if(realhotdatakey[realhotdatakeykey] === false){
                  realhotdatakey[realhotdatakeykey] = 'false';
                };
              };
              postvalue.push(realhotdata);
            };
            fetch('/m/penetrationtest/penetrationtestinsert', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ rowData: postvalue }),
              })
              .then(response => response.json())
              .then(data => {
                  console.log(data.success);
                  alert(data.success);
                  changedkey = new Set();            
                  postvalue = [];
                  var href = "./detail?testcount=0&code="+data.success;
                  location.href=href;

              })
              .catch(error => {
                  console.error('Error updating row data:', error);
                  alert('저장 실패, 다시 시도해주세요.');
              });         
            };
      
          // Function to send row data to the server
          function sendRowDataToServer(rowData) {
              const sanitizedRowData = rowData.map(row => (row === undefined ? null : row));

              fetch('/m/penetrationtest/penetrationtestinsert', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ rowData: sanitizedRowData }),
              })
              .then(response => response.json())
              .then(data => {
                  console.log(data);
              })
              .catch(error => {
                  console.error('Error updating row data:', error);
              });
          }
        </script>
        `;


        res.render('tmpgrid', { title : "모의해킹 종합 - 최초진단 추가", head : null, body : body, script : script});
        //connection.end();
    });
    });

router.post('/', (req, res, next) => {
    var sql = "INSERT INTO penetrationtest (manage_code, status, url, urlcount, pentester, testcount, manday, startdate, enddate, actdate, memo) VALUES (?, '1', ?, ?, ?, 0, ?, ?, ?, ?, ?)";
    var values = []
    console.log(values);
    //받은 파라미터를 values에 추가
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
    //쿼리 실행
    // db.query(sql,values,function(err, rows, fields) {
    //   if (err){
    //     console.log(err);
    //   }
    //   else{
    //     console.log(rows.insertId);
    //   }
    // });
    //302
    res.status(200).json({ success: req.body.rowData[0][0][0] });
    //connection.end();
  });

module.exports = router;
