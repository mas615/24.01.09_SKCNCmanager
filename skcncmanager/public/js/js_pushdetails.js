const container = document.getElementById('data');
const container2 = document.getElementById('data2');
const hot = new Handsontable(container, {
    data: data,
    colHeaders: ["점검회차.", "URL or IP", "URL 수", "대상종류", "진단자", "진행상태", "진단공수", "진단시작일", "진단 종료일", "조치 예정일", "비고"],
    fillHandle: false, //셀 드래그 방지
    filters: true, // 필터 활성화
    rowHeaders: true, // 행 넘버 출력
    licenseKey: 'non-commercial-and-evaluation',
    columns : [{readOnly: true},{readOnly: true},{readOnly: true},{readOnly: true},{},{},{},{},{},{},{}],
});

const hot2 = new Handsontable(container2, {
    data: data2,
    licenseKey: 'non-commercial-and-evaluation',
    rowHeaders: true,
    colHeaders: ["취약점", "위험도", "내용", "발생위치", "진단시작일", "진단종료일", "조치상태", "비고", "담당자", "조치예정일", "조치내용"],
    columns : [{type: 'dropdown',source: vulner}, {}, {width : 200}, {width : 200}, {type: "date", dateFormat: 'YYYY-MM-DD'}, {type: "date", dateFormat: 'YYYY-MM-DD'}, {}, {}, {}, {type: "date", dateFormat: 'YYYY-MM-DD'}, {}],
});

// 사용자 지정 버튼 클릭 시 행 추가
var addButton = document.getElementById('addButton');
addButton.addEventListener('click', function() {
hot2.alter('insert_row');
});

async function aalert() {
    const table1Data = hot.getData()
        .map(row => row.map(cells => cells === '' ? null : cells))
        .filter(row => row.some(cell => cell !== null))
        .map(row => [code, ...row]);
    const allData = hot2.getData()
        .map(row => row.map(cells => cells === '' ? null : cells))
        .filter(row => row.some(cell => cell !== null))
        .map(row => [code, table1Data[0][1], ...row]); //table1Data[0][1]은 testcount임
    
    console.log(table1Data);
    console.log(allData);

    try {
        // 첫 번째 fetch 요청
        const response1 = await fetch('../api/insert/pushdetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(table1Data)
        });

        if (!response1.ok) {
            throw new Error('진단 차수 요청 실패');
        }

        // 두 번째 fetch 요청
        const response2 = await fetch('../api/insert/pushdetails2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allData)
        });

        if (!response2.ok) {
            throw new Error('취약점 요청 실패');
        }

        // 두 fetch 요청이 모두 성공한 경우 리다이렉트
        alert("저장 되었습니다.");
        window.location.href = `./details?code=${code}&testcount=${table1Data[0][1]}`;
    } catch (error) {
        console.error('데이터 전송 중 오류 발생:', error);
        alert('데이터 전송 중 오류 발생:'+error);
    }
}

function handleDeleteButtonClick(event) {
    var row = event.target.parentNode.rowIndex;
    hot2.alter('remove_row', row);
}