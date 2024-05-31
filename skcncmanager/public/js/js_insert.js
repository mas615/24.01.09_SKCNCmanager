const data = [['P' + codefamily.project_code, 'S' + codefamily.service_code]];
const data2 = [['A' + codefamily.manage_code_A, 'B' + codefamily.manage_code_B, 'C' + codefamily.manage_code_C, 'D' + codefamily.manage_code_D, 'E' + codefamily.manage_code_E]];
console.log(codefamily);

// 빈 raw용 while문
let datanum = 0;
while (datanum < 29) {
    data[0].push(null);
    datanum++;
}

let changedkey = new Set();
let postvalue = [];

// Handsontable을 초기화하고 옵션 설정
const container = document.getElementById('example');
const hot = new Handsontable(container, {
    data: data,
    colHeaders: [
        '프로젝트코드', '서비스코드', '관리코드', '프로젝트명', '신규 점검유형', '기존 점검유형', 'open일', '관계사명', '담당업체', '담당부서', '담당자', '연락처', '담당업체', '담당부서', '담당자', '연락처', '모의해킹', '소스코드 진단', '인프라 진단', '비고', '신규투자(회사)', '사업팀요청(자체투자)', '사내시스템', '대외인증', '그룹공통', '사업팀요청(관계사)', '멤버사진단', '23년관리코드', '23년이관현황'
    ],
    rowHeaders: true,
    licenseKey: 'non-commercial-and-evaluation',
    sortIndicator: true, // 정렬된 열 표시 활성화
    columnSorting: true, // 정렬 기능 활성화
    dropdownMenu: true, // 필터 메뉴 활성화
    filters: true, // 필터 활성화
    columns: [
        {}, {}, {}, {}, { type: 'dropdown', source: ['사내시스템', '그룹공통', '신규투자', '사업부서요청', '멤버사진단'] },
        { type: 'dropdown', source: ['사내시스템', '그룹공통', '신규투자', '사업부서요청', '멤버사진단'] },
        { type: 'date', dateFormat: 'YYYY.MM.DD' }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, 
    ],
});

const container2 = document.getElementById('example2');
const hot2 = new Handsontable(container2, {
    data: data2,
    colHeaders: [
        'A', 'B', 'C', 'D', 'E'
    ],
    licenseKey: 'non-commercial-and-evaluation',
    columns: [
        {}, {}, {}, {}, {}, 
    ],
});

var addButton = document.getElementById('addButton');
addButton.addEventListener('click', function() {
hot.alter('insert_row');
});

// 버튼 연결
document.getElementById('clearFiltersButton').addEventListener('click', function () {
    clearFilters();
});

// 진행 상황 표시를 위한 HTML 요소 추가
const progressElement = document.createElement('div');
progressElement.id = 'progress';
progressElement.style.position = 'fixed';
progressElement.style.bottom = '20px';
progressElement.style.left = '20px';
progressElement.style.backgroundColor = '#f1f1f1';
progressElement.style.padding = '10px';
progressElement.style.borderRadius = '5px';
document.body.appendChild(progressElement);

// 저장
async function clearFilters() {
    const realhotdata = hot.getData();
    const totalRows = realhotdata.length;
    let completedRows = 0;
    
    for (const key of realhotdata) {
        if (!key.every(element => element === null)) {
            try {
                const response = await fetch('/m/api/insert/project', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(key),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('Row inserted:', data);
            } catch (error) {
                console.error('Error inserting row:', error);
                alert('오류가 발생했습니다. 다시 시도해주세요.');
                return;
            }
        }
        completedRows++;
        // 진행 상황 업데이트
        progressElement.innerText = `진행 상황: ${completedRows} / ${totalRows}`;
    }

    alert('모든 행이 성공적으로 전송되었습니다.');
    progressElement.innerText = '진행 완료';
    window.location.href = `/m/projects`;
}


