var express = require('express');
var router = express.Router();
var db = require('../../db');

router.get('/', function(req, res, next) {
    sql = 'select manage_code, project_name from project_table where not exists (select 1 from penetrationtest where project_table.manage_code = penetrationtest.manage_code) AND del = "false" order by manage_code';
    db.query(sql, (error, projectcode, fields) => {
        console.log(projectcode);
        var dropdata = [];
        for(const projectcodekey of projectcode){
          pushdata = `[${projectcodekey.manage_code}] : ${projectcodekey.project_name}`;
          dropdata.push(pushdata);
        };
        var body = `<button onclick="aalert()">버튼</button><button id="addButton">행 추가</button><div id="table1" class="hot"></div> <br> <div id="table2" class="hot"></div>`;
        var script = `<script src="/handsontable/handsontable.full.js"></script>
        <script>
            const container1 = document.getElementById('table1');
            const hot1 = new Handsontable(container1, {
                licenseKey: 'non-commercial-and-evaluation',
                colHeaders: ["진단대상", "URL", "URL수", "진단자", "진단공수", "진단시작일", "진단종료일", "조치예정일", "비고"],
                columns : [{width: 300, type: 'dropdown',source:${JSON.stringify(dropdata)}},{},{type: 'numeric'},{},{type: 'numeric'},{type: "date", dateFormat: 'YYYY.MM.DD'},{type: "date", dateFormat: 'YYYY.MM.DD'},{type: "date", dateFormat: 'YYYY.MM.DD'},{}],
                data: [[null,null,null,null,null,null,null,null,null],]
            });
    
            const container2 = document.getElementById('table2');
            const hot2 = new Handsontable(container2, {
                licenseKey: 'non-commercial-and-evaluation',
                rowHeaders: true,
                colHeaders: ["취약점", "내용", "발생위치", "최종점검일", "조치상태", "담당자", "조치내용", "비고"],
                columns : [{type: 'dropdown',source: ['AA인젝션', 'BB크사', 'CC암호', 'DD평문']}, {}, {}, {type: "date", dateFormat: 'YYYY.MM.DD'}, {}, {}, {}, {}],
                data: [[null,null,null,null,null,null,null],],
                afterGetRowHeader: function(row, TH) {
                    // 이전에 바인딩된 이벤트 핸들러 제거
                    var existingButton = TH.querySelector('.deleteButton');
                    if (existingButton) {
                        existingButton.removeEventListener('click', handleDeleteButtonClick);
                        existingButton.remove();
                    }
            
                    // 삭제 버튼 생성 및 이벤트 핸들러 추가
                    var button = document.createElement('button');
                    button.innerHTML = 'X';
                    button.className = 'deleteButton';
                    button.addEventListener('click', function() {
                        hot2.alter('remove_row', row);
                    });
            
                    // 행 헤더의 스타일 조정
                    TH.style.display = 'flex';
                    TH.style.alignItems = 'center';
                    TH.style.justifyContent = 'space-between';
                    TH.appendChild(button); // 버튼 추가
                }
            });
    
            // 사용자 지정 버튼 클릭 시 행 추가
            var addButton = document.getElementById('addButton');
            addButton.addEventListener('click', function() {
            hot2.alter('insert_row');
            });
            
            function aalert(){
                const table1Data = hot1.getDataAtRow(0);
                const table2Data = hot2.getDataAtRow(0);
                const allData = hot1.getData()
                    .map(row => row.map(cells => cells === '' ? null : cells))
                    .filter(row => row.some(cell => cell !== null));
                allData[0][0] = allData[0][0].substring(1,5);

                var firstElement = allData[0][0];
                const allData2 = hot2.getData()
                    .map(row => row.map(cells => cells === '' ? null : cells))
                    .filter(row => row.some(cell => cell !== null))
                    .map(row => [firstElement, 0, ...row]);          
                console.log('진단대상',allData);
                console.log('취약점',allData2);
                var postvalue = [];
                //postvalue.push(allData);
                postvalue.push(allData2);

                // fetch('../api/insert/pentest', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({ rowData: postvalue }),
                // })
                // .then(response => response.json())
                // .then(data => {
                //     console.log(data);           
                // })
                // .catch(error => {
                //     console.error('Error updating row data:', error);
                //     alert('저장 실패, 다시 시도해주세요.');
                // });

                fetch('../api/insert/vulner', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rowData: allData2 }),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);           
                })
                .catch(error => {
                    console.error('Error updating row data:', error);
                    alert('저장 실패, 다시 시도해주세요.');
                });
                
            };
    
            function handleDeleteButtonClick(event) {
                var row = event.target.parentNode.rowIndex;
                hot2.alter('remove_row', row);
            }
            
        </script>
        `;
        res.render('tmpgrid', { title : "모의해킹 종합", head : null, body : body, script : script});
    });
});

module.exports = router;