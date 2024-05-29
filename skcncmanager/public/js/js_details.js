const container = document.getElementById('data1');
const container2 = document.getElementById('data2');
const hot = new Handsontable(container, {
    data: data,
    colHeaders: ["점검회차", "진행상태", "URL or IP", "URL 수", "진단자", "진단공수", "진단시작일", "진단 종료일", "조치 예정일", "비고", "상세보기"],
    fillHandle: false, //셀 드래그 방지
    licenseKey: 'non-commercial-and-evaluation',
    columns : [{},{},{},{},{},{},{},{},{},{},{
        // 링크를 열기 위한 하이퍼링크 렌더러
        renderer: function (instance, td, row, col, prop, value, cellProperties) {
            // 이미 하이퍼링크가 있는지 확인
            if (!td.querySelector('a')) {
                const link = instance.getDataAtCell(row, 0);  // 링크 값을 가져오기
                const locationlink = "./details?code=" + code + "&testcount=" + link;
                const a = document.createElement('a');
                a.textContent = link + "회차 상세보기";
                a.href = locationlink;
                a.target = '_self';  // '_blank'로 변경하면 새 탭에서 열기
                td.appendChild(a);
            }
            return td;
        }
    }],
});
const hot2 = new Handsontable(container2, {
    data: data2,
    colHeaders: ["No.", "점검회차", "취약점", "내용", "발생위치", "최종점검일", "조치상태", "담당자", "조치내용", "비고"],
    fillHandle: false, //셀 드래그 방지
    sortIndicator: true, // 정렬된 열 표시 활성화
    columnSorting: true, // 정렬 기능 활성화
    dropdownMenu: true, // 필터 메뉴 활성화
    filters: true, // 필터 활성화
    rowHeaders: true, // 행 넘버 출력
    licenseKey: 'non-commercial-and-evaluation',
    columns : [{},{},{},{},{},{},{},{},{},{}],
});