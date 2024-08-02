const container = document.getElementById('data');

//컬럼 설정
var htmiddle = [];
for(var i = 0; i < 13 ; i++){
  htmiddle.push({className: 'htLeft htMiddle'});
}
//htmiddle[0].readOnly = true;
//htmiddle[1].readOnly = true;
//컬럼 설정 끝 readOnly: true

const hot = new Handsontable(container, {
    data: data,
    licenseKey: 'non-commercial-and-evaluation',
    rowHeaders: true,
    colHeaders: ["seq", "구분", "순위", "프로젝트명", "진단유형", "계획시작일", "계획종료일", "실적시작일", "실적종료일", "진단자", "진행상황", "진행일정", "비고"],
    columns : htmiddle,
    sortIndicator: true, // 정렬된 열 표시 활성화
    columnSorting: true, // 정렬 기능 활성화
    dropdownMenu: true, // 필터 메뉴 활성화
    filters: true, // 필터 활성화
    hiddenColumns: {
        columns:[0]
    },
});

// 사용자 지정 버튼 클릭 시 행 추가
var addButton = document.getElementById('addButton');
addButton.addEventListener('click', function() {
hot.alter('insert_row');
});

//새로 생성된 행의 기본값 설정
hot.addHook('afterCreateRow', function(index, amount, source) {
    var defaultValue = '신규'; // 원하는 기본값 설정
    hot.setDataAtCell(index, 0, defaultValue); // index는 새로 생성된 행의 인덱스, 0는 설정하려는 컬럼의 인덱스
    hot.setDataAtCell(index, 1, part); // index는 새로 생성된 행의 인덱스, 2는 설정하려는 컬럼의 인덱스
});

document.getElementById('submitButton').addEventListener('click', function() {
    const sdata = hot.getData();

    const fetchRequests = sdata.map(row => {
    const isNew = row[0] === "신규";
    const allOtherValuesNull = row.slice(1).every(value => value === null);
    const allValuesNullExcludingFirstTwo = row.slice(2).every(value => value === null);

    if (isNew) {
        if (!allOtherValuesNull) {
            return fetch('../api/insert/dailynew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(row)
            });
        }
    } else {
        if (allValuesNullExcludingFirstTwo) {
            return fetch('../api/insert/dailydel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(row)
            });
        } else {
            return fetch('../api/insert/dailyupdate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(row)
            });
        }
    }

    return Promise.resolve(); // No-op for rows that should not be sent
});

Promise.all(fetchRequests)
    .then(responses => {
        alert('All requests have been completed.');
        location.reload(); // Reload the page
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during the requests.');
    });
});