var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var db = require('../../db');
//라우팅
const detail = require('./detail.js');
const pushvulner = require('./pushvulner.js');
const pushdetail = require('./pushdetail.js');
const pentestcount = require('./pentestcount.js');
const gridtest = require('./gridtest.js');
const penetrationtestinsert = require('./penetrationtestinsert.js');
const detailtest = require('./detailtest.js');

router.use("/detail", detail);
router.use("/pushvulner", pushvulner);
router.use("/pushdetail", pushdetail);
router.use("/pentestcount", pentestcount);
router.use("/gridtest", gridtest);
router.use("/penetrationtestinsert", penetrationtestinsert);
router.use("/detailtest", detailtest);

router.get('/', function(req, res, next) {
    db.query('select manage_code, project_name from project_table where not exists (select 1 from penetrationtest where project_table.manage_code = penetrationtest.manage_code) order by manage_code', (error, projectcode, fields) => {
        var select 
        for(const projectcodekey of projectcode){
            select += `<option value="${projectcodekey.manage_code}">[${projectcodekey.manage_code}] : ${projectcodekey.project_name}</option>`
        };
    sql = `SELECT project_name, old_inspectiontype, penetrationtest.manage_code, status, url, urlcount, pentester, testcount, manday, DATE_FORMAT(startdate, "%y-%m-%d"), DATE_FORMAT(enddate, "%y-%m-%d"), DATE_FORMAT(actdate, "%y-%m-%d"), memo FROM penetrationtest INNER JOIN project_table ON penetrationtest.manage_code = project_table.manage_code WHERE (penetrationtest.manage_code, testcount) IN (SELECT manage_code, MAX(testcount) AS max_testcount FROM penetrationtest GROUP BY manage_code) ORDER BY penetrationtest.manage_code`;
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
        var head = `<link href="/handsontable/handsontable.full.css" rel="stylesheet">`;
        var body = `<button id="clearFiltersButton" onclick='location.href="./penetrationtest/penetrationtestinsert"'>대상 추가</button><div id="example"></div>`;
        script = `<script src="/handsontable/handsontable.full.js"></script>
          <script>
          // 서버에서 전달된 데이터를 EJS 템플릿에서 사용
          const data = ${JSON.stringify(data)};
      
          // Handsontable을 초기화하고 옵션을 설정합니다.
          const container = document.getElementById('example');
          const hot = new Handsontable(container, {
              data: data,
              colHeaders: ["대상명", "기존 진단구분", "진단대상 관리코드", "진행상태", "URL or IP", "URL 수", "진단자", "점검회차", "진단공수", "진단 시작일", "진단 종료일", "조치 예정일", "비고","상세보기"],
              fillHandle: false, //셀 드래그 방지
              sortIndicator: true, // 정렬된 열 표시 활성화
              columnSorting: true, // 정렬 기능 활성화
              dropdownMenu: true, // 필터 메뉴 활성화
              filters: true, // 필터 활성화
              rowHeaders: true, // 행 넘버 출력
              licenseKey: 'non-commercial-and-evaluation',
              columns : [{},{},{},{},{},{},{},{},{},{},{},{},{},
                {
                  // 링크를 열기 위한 버튼 렌더러
                  renderer: function (instance, td, row, col, prop, value, cellProperties) {
                      // 이미 버튼이 있는지 확인
                      if (!td.querySelector('button')) {
                          const button = document.createElement('button');
                          button.textContent = '상세보기';
                          button.addEventListener('click', function() {
                              // 링크를 여는 로직
                              const link = instance.getDataAtCell(row, 2);
                              const locationlink = "./penetrationtest/detail?code="+link+"&testcount=0";
                              location.href = locationlink;
                              //window.open(link, '_blank');
                          });
                          td.appendChild(button);
                      }
                      return td;
                }
              }],
          });
        </script>
        `;


        res.render('tmpgrid', { title : "모의해킹 종합", head : null, body : body, script : script});
        //connection.end();
    });
    });
    
});

router.post('/', (req, res, next) => {
    var sql = "INSERT INTO penetrationtest (manage_code, status, url, urlcount, pentester, testcount, manday, startdate, enddate, actdate, memo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
    res.redirect(302, "/m/penetrationtest");
    //connection.end();
  });


module.exports = router;
