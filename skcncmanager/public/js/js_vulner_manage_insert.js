const container = document.getElementById('data');
const data1 = [[]];
const hot = new Handsontable(container, {
    data: data1,
    colHeaders: ["점검회차", "관리코드", "취약점", "위험도", "내용", "발생", "진단시작일", "진단종료일", "조치상태", "비고", "조치담당자", "조치예정일", "조치내용"],
    fillHandle: false, //셀 드래그 방지
    sortIndicator: true, // 정렬된 열 표시 활성화
    columnSorting: true, // 정렬 기능 활성화
    dropdownMenu: true, // 필터 메뉴 활성화
    filters: true, // 필터 활성화
    rowHeaders: true, // 행 넘버 출력
    licenseKey: 'non-commercial-and-evaluation',
    columns : [{},{},{},{},{},{},{},{},{},{},{},{},{}],
});

async function send() {
    const hotdata = hot.getData(); // 모든 행 할당    
    const filteredData = hotdata.filter(row => row.some(cell => cell !== null)); // 모든 요소가 null인 행을 제외한 데이터를 필터링
    const fetchRequests = filteredData.map(row => {
        const url = '../../api/insert/vulner_manage_insert';
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(row),
        });
    });

    try {
        const responses = await Promise.all(fetchRequests);
        for (const response of responses) {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
        }
        alert('정상적으로 완료 되었습니다.');
        window.location.href = '/m/penetrationtest/vulner_manage'; // 리다이렉션할 페이지의 URL로 변경하세요.
    } catch (error) {
        alert('오류발생!');
        console.error('Error:', error);
    }
}

// 24.06.05 이전코드
// function send() {    
//     hotdata = hot.getData(); // 모든 행 할당
//     for(const check of hotdata){ // 체크를 드래그해서 한번에 여러개 할경우 키값추가
//         if(check[0] == true){
//             changedkey.add(check[1]);
//         };
//     };
//     changedkey.delete(null); // null 값 빼기
//     console.log(changedkey);
//     const filteredData = hotdata.filter(row => changedkey.has(row[1])); // changedkey와 No가 맞는행만 필터링

//     fetch('../api/insert/penetrationtest_manage', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(filteredData),
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Success:', data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// };