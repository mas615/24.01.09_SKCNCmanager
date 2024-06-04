const container1 = document.getElementById('table1');
            const hot1 = new Handsontable(container1, {
                licenseKey: 'non-commercial-and-evaluation',
                colHeaders: ["진단대상", "진행상태", "URL", "URL수", "대상종류", "진단자", "진단공수", "진단시작일", "진단종료일", "조치예정일", "비고"],
                columns : [{width: 300, type: 'dropdown',source:js_detailtest},{},{},{type: 'numeric'}, {type: 'dropdown',source: ["웹", "모바일", "CS"]}, {},{type: 'numeric'},{type: "date", dateFormat: 'YYYY-MM-DD'},{type: "date", dateFormat: 'YYYY-MM-DD'},{type: "date", dateFormat: 'YYYY-MM-DD'},{}],
                data: [[null,null,null,null,null,null,null,null,null],]
            });
    
            const container2 = document.getElementById('table2');
            const hot2 = new Handsontable(container2, {
                licenseKey: 'non-commercial-and-evaluation',
                rowHeaders: true,
                colHeaders: ["취약점", "위험도", "내용", "발생위치", "진단시작일", "진단종료일", "조치상태", "비고", "담당자", "조치예정일", "조치내용"],
                columns : [{type: 'dropdown',source: vulner}, {}, {width : 200}, {width : 200}, {type: "date", dateFormat: 'YYYY-MM-DD'}, {type: "date", dateFormat: 'YYYY-MM-DD'}, {}, {}, {}, {type: "date", dateFormat: 'YYYY-MM-DD'}, {}],
                data: [[null,null,null,null,null,null,null,null,null,null,null],],
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
                var postvalue2 = [];
                postvalue.push(allData);
                postvalue2.push(allData2);

                fetch('../api/insert/pentest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rowData: postvalue }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // 첫 번째 요청이 성공하면 두 번째 요청을 보냄
                    return fetch('../api/insert/vulner', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ rowData: allData2 }),
                    });
                })
                .then(response => response.json())
                .then(data => {
                    console.log(postvalue[0][0][0]);
                    alert("저장 성공")
                    window.location.href = `./details?code=${postvalue[0][0][0]}&testcount=0`;
                    
                })
                .catch(error => {
                    console.error('Error updating row data:', error);
                    alert("알수 없는 오류가 발생하였습니다. 데이터를 확인해주세요.")
                });
                
                
            };
    
            function handleDeleteButtonClick(event) {
                var row = event.target.parentNode.rowIndex;
                hot2.alter('remove_row', row);
            }
            