let changedkey = new Set();
          let postvalue = [];
      
          // Handsontable을 초기화하고 옵션 설정
          const container = document.getElementById('example');
          const hot = new Handsontable(container, {
              data: data,
              colHeaders: ['Seq', '삭제', '프로젝트코드','서비스코드','관리코드','프로젝트명','신규 점검유형','기존 점검유형','open일','관계사명','담당업체','담당부서','담당자','연락처','담당업체','담당부서','담당자','연락처','모의해킹','소스코드 진단','인프라 진단','비고','신규투자(회사)','사업팀요청(자체투자)','사내시스템','대외인증','그룹공통','사업팀요청(관계사)','멤버사진단','23년관리코드','23년이관현황'],
              rowHeaders: true,
              licenseKey: 'non-commercial-and-evaluation',
              fillHandle: false,
              sortIndicator: true, // 정렬된 열 표시 활성화
              columnSorting: true, // 정렬 기능 활성화
              dropdownMenu: true, // 필터 메뉴 활성화
              filters: true, // 필터 활성화
              // hiddenColumns: {
              //   columns: [0], // 숨길 열의 인덱스를 지정
              //   indicators: true // 열이 숨겨졌음을 나타내는 표시기 표시
              // },
              columns: [{ readOnly: true },{type: 'checkbox',trueValue: 1, falseValue: 0},{},{},{},{},{type: 'dropdown',source: ['A', 'B', 'C', 'D']},{},{type: "date", dateFormat: 'YYYY.MM.DD'},{},{},{},{},{},{},{},{},{},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{type: "checkbox"},{},{type: "checkbox"}
              ],
              afterPaste: (data, coords) => {
                  const a = coords[0].startRow;
                  const b = coords[0].endRow;
                  const rowIndices = [];
                  for (let i = a; i <= b; i++) {
                      // 반복하고자 하는 동작 수행
                      rowIndices.push(i);
                  };
                  const rowDataToSend = rowIndices.map(rowIndex => hot.getDataAtRow(rowIndex));

                  sendRowDataToServer(rowDataToSend);
              },
              afterChange: (changes, source) => {
                  if (source === 'edit') {
                      const rowIndices = changes.map(change => change[0]);
                      const rowDataToSend = rowIndices.map(rowIndex => hot.getDataAtRow(rowIndex));

                      sendRowDataToServer(rowDataToSend);
                  }
              },
          });

          //필터링 해제 및 저장함수
          function clearFilters() {
            hot.getPlugin('filters').clearConditions();
            hot.getPlugin('filters').filter()
            realhotdata = hot.getData();
            console.log('리얼핫데이타',realhotdata);
            console.log('체인지드프라이머리키',changedkey);
            for(const realhotdatakey of realhotdata){
              if (changedkey.has(realhotdatakey[0])) {
                  // 조건을 충족하는 경우의 처리                  
                  for(const realhotdatakeykey in realhotdatakey){
                    console.log('리얼핫데이타키키',realhotdatakeykey);
                    if(realhotdatakey[realhotdatakeykey] === true){
                      realhotdatakey[realhotdatakeykey] = 'true';
                    }else if(realhotdatakey[realhotdatakeykey] === false){
                      realhotdatakey[realhotdatakeykey] = 'false';
                    };
                  }
                  console.log('일치', realhotdatakey[0]);
                  postvalue.push(realhotdatakey);
              } else {
                  // 조건을 충족하지 않는 경우의 처리
                  //console.log('i와 k 배열의 값이 모두 다릅니다.');
              }
            };
            fetch('/m/projectsedit/update', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ rowData: postvalue }),
              })
              .then(response => response.json())
              .then(data => {
                  console.log(data);
                  alert('저장 성공');
                  changedkey = new Set();            
                  postvalue = [];
                  location.reload();

              })
              .catch(error => {
                  console.error('Error updating row data:', error);
                  alert('저장 실패, 다시 시도해주세요.');
              });         
            };
      
          // Function to send row data to the server
          function sendRowDataToServer(rowData) {
              const sanitizedRowData = rowData.map(row => (row === undefined ? null : row));

              //수정사항 프라이머리키 저장
              for(const rowDatakey of rowData){
                changedkey.add(rowDatakey[0]);
              };                 
          };
          hot.addHook('afterUndo', function() {
              console.log('Ctrl+Z를 눌렀습니다. 되돌리기가 수행되었습니다.');
              // 로직을 바꿔서 쓸모 없어져 버렸지만 언제 쓰일지 몰라서 주석처리
              // editlog2.unshift(editlog.splice(0,1)[0]);
              // console.log(editlog);
          });
          hot.addHook('afterRedo', function() {
              console.log('Ctrl+Y를 눌렀습니다. 다시 실행이 수행되었습니다.');
              // 로직을 바꿔서 쓸모 없어져 버렸지만 언제 쓰일지 몰라서 주석처리
              // editlog.unshift(editlog2.splice(0, 1)[0]);
              // console.log(editlog2);
          });
          newrowcount = 0;
          hot.addHook('afterCreateRow', function(index, amount, source) {
            console.log('인덱스',index);            
            // 새로운 행이 추가될 때마다 첫 번째 셀에 특정 데이터를 설정
            hot.setDataAtCell(index, 0, 'A'+newrowcount);
            hot.setDataAtCell(index, 1, '이 행은 저장되지 않습니다.');
            // changedkey.add('A'+newrowcount);
            // newrowcount ++;
            // hot.alter('remove_row', index);
          });

          //버튼연결
          document.getElementById('clearFiltersButton').addEventListener('click', function() {
            clearFilters();
          });