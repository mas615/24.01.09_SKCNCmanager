
      
          // Handsontable을 초기화하고 옵션을 설정합니다.
          const container = document.getElementById('example');
          const hot = new Handsontable(container, {
              data: data,
              colHeaders: ["대상명", "기존구분", "관리코드", "진행상태", "URL or IP", "URL 수", "진단자", "점검회차", "공수", "시작일", "종료일", "조치 예정일", "비고","상세보기"],
              fillHandle: false, //셀 드래그 방지
              sortIndicator: true, // 정렬된 열 표시 활성화
              columnSorting: true, // 정렬 기능 활성화
              dropdownMenu: true, // 필터 메뉴 활성화
              filters: true, // 필터 활성화
              rowHeaders: true, // 행 넘버 출력
              licenseKey: 'non-commercial-and-evaluation',
              columns : [{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
              afterOnCellMouseDown: (event, coords, TD) => {
                if (coords.row !== -1 && coords.col === 2) { // 헤더가 아니고 관리코드 열을 클릭했는지 확인
                    const link = hot.getDataAtCell(coords.row, coords.col);
                    const link2 = hot.getDataAtCell(coords.row, 7);
                    window.location.href = "./penetrationtest/details?code=" + link + "&testcount=" + link2;
                }
            },
          });


//   {
//     // 링크를 열기 위한 하이퍼링크 렌더러
//     renderer: function (instance, td, row, col, prop, value, cellProperties) {
//         // 이미 하이퍼링크가 있는지 확인
//         if (!td.querySelector('a')) {
//             const link = instance.getDataAtCell(row, 2);  // 링크 값을 가져오기
//             const locationlink = "./penetrationtest/detail?code=" + link + "&testcount=0";
//             const a = document.createElement('a');
//             a.textContent = '상세보기';
//             a.href = locationlink;
//             a.target = '_self';  // '_blank'로 변경하면 새 탭에서 열기
//             td.appendChild(a);
//         }
//         return td;
//     }
// }