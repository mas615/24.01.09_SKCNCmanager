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
            data: [
                ['table1_data1', 'table1_data2'],
                ['table1_data3', 'table1_data6'],
                // Add more data as needed
            ],
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
            const allData2 = hot2.getData();
            console.log(table1Data);
            console.log(table2Data);
            console.log(allData);
            console.log(allData2);
        };
        
    </script>
    `;
    res.render('tmpgrid', { title : "모의해킹 종합", head : null, body : body, script : script});
});

module.exports = router;