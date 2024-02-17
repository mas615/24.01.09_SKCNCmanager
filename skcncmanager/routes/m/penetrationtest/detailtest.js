var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var body = `<button onclick="aalert()">버튼</button><button id="addButton">행 추가</button><div id="table1" class="hot"></div> <br> <div id="table2" class="hot"></div>`;
    var script = `<script src="/handsontable/handsontable.full.js"></script>
    <script>
        const container1 = document.getElementById('table1');
        const hot1 = new Handsontable(container1, {
            licenseKey: 'non-commercial-and-evaluation',
            colHeaders: ["진단대상", "URL", "URL수", "진단자", "진단공수", "진단시작일", "진단종료일", "조치예정일", "비고"],
            data: [
                [null,null,null,null,null,null,null,null,null],
            ]
        });

        const container2 = document.getElementById('table2');
        const hot2 = new Handsontable(container2, {
            licenseKey: 'non-commercial-and-evaluation',
            rowHeaders: true,
            colHeaders: true,
            columns : [{},{type: 'dropdown',source: ['A', 'B', 'C', 'D']}],
            data: [
                ['table1_data1', 'table1_data2'],
                ['table1_data3', 'table1_data6'],
                // Add more data as needed
            ],
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
            const allData = hot1.getData();
            const allData2 = hot2.getData().filter(row => row.some(cell => cell !== null));
            console.log(allData);
            console.log(allData2);
        };

        function handleDeleteButtonClick(event) {
            var row = event.target.parentNode.rowIndex;
            hot2.alter('remove_row', row);
        }
        
    </script>
    `;
    res.render('tmpgrid', { title : "모의해킹 종합", head : null, body : body, script : script});
});

module.exports = router;