const container = document.getElementById('data');
const data1 = [];
changedkey = new Set();
for(const key of data){
    datadata = [null];
    for(const keykey in key){
        datadata.push(key[keykey]);
    }
    data1.push(datadata);
};
const hot = new Handsontable(container, {
    data: data1,
    colHeaders: ["삭제", "No.", "점검회차", "관리코드", "취약점", "위험도", "내용", "발생", "진단시작일", "진단종료일", "조치상태", "비고", "조치담당자", "조치예정일", "조치내용"],
    fillHandle: false, //셀 드래그 방지
    sortIndicator: true, // 정렬된 열 표시 활성화
    columnSorting: true, // 정렬 기능 활성화
    dropdownMenu: true, // 필터 메뉴 활성화
    filters: true, // 필터 활성화
    rowHeaders: true, // 행 넘버 출력
    licenseKey: 'non-commercial-and-evaluation',
    columns : [{type: 'checkbox',trueValue: 1, falseValue: 0},{},{},{},{},{},{width : 200},{width : 200},{},{},{},{},{},{},{}],
    afterPaste: (data, coords) => {
        const a = coords[0].startRow;
        const b = coords[0].endRow;
        const rowIndices = [];
        for (let i = a; i <= b; i++) {
            // 반복하고자 하는 동작 수행
            rowIndices.push(i);
        };
        const rowDataToSend = rowIndices.map(rowIndex => hot.getDataAtRow(rowIndex));
        for (const key of rowDataToSend){
            changedkey.add(key[1]);
        }
    },
    afterChange: (changes, source) => { // 수정사항 있는 행 seq저장
        if (source === 'edit') {
            const rowIndices = changes.map(change => change[0]);
            const rowDataToSend = rowIndices.map(rowIndex => hot.getDataAtRow(rowIndex));
            changedkey.add(rowDataToSend[0][1]);
        }
    }
});

function send() {    
    hotdata = hot.getData(); // 모든 행 할당
    for(const check of hotdata){ // 체크를 드래그해서 한번에 여러개 할경우 키값추가
        if(check[0] == true){
            changedkey.add(check[1]);
        };
    };
    changedkey.delete(null); // null 값 빼기
    console.log(changedkey);
    const filteredData = hotdata.filter(row => changedkey.has(row[1])); // changedkey와 No가 맞는행만 필터링

    fetch('../api/insert/penetrationtest_manage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filteredData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};