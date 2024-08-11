const grid = new tui.Grid({
    el: document.getElementById('grid'),
    data: data,
    scrollX: false,
    scrollY: false,
    columns: [
        { header: 'Seq', name: 'seq', width: 'auto' },
        { header: 'ID', name: 'id', width: 'auto', editor: 'text' },
        { header: 'PW(hash+hash,salt)', name: 'pw', width: 'auto', editor: 'text' },
        { header: '이름', name: 'name', width: 'auto', editor: 'text' },
        { header: '권한', name: 'level', width: 'auto', editor: 'text'},
        { header: '마지막패스워드변경', name: 'lastlogin', width: 'auto', editor: 'text' },
        { header: '생성일', name: 'created_at', width: 'auto', editor: 'text' },
      ]
    });
grid.on('afterChange', () => {
    const allData = grid.getData();  // 테이블의 모든 데이터 가져오기
    console.log(allData);  // 콘솔에 데이터 출력
})

function collectFormData() {
    let formDataArray = [];
    const formElements = document.querySelectorAll('#makeuser input');
    formElements.forEach(element => {
        formDataArray.push(element.value);
    });
    formDataArray[formDataArray.length - 1] = parseInt(formDataArray[formDataArray.length - 1], 10);
    fetch('/m/api/insert/makeuser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataArray),
      })
      .then(response => {
        if (!response.ok) {
            return response.json().then(err => {
                let errorMessage;
                switch (err.errno) {
                    case 1062:
                        errorMessage = '중복된 항목이 있습니다. 다른 값을 입력하세요.';
                        break;
                    case 1452:
                        errorMessage = '잘못된 참조 키입니다. 다른 값을 입력하세요.';
                        break;
                    case 1048:
                        errorMessage = '필수 입력 항목이 누락되었습니다. 모든 항목을 입력해주세요.';
                        break;
                    default:
                        errorMessage = `알 수 없는 오류가 발생했습니다. (오류 코드: ${err.errno})`;
                }
                throw new Error(errorMessage);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('데이터 전송 성공:', data);
        alert("계정 생성 완료!")
        location.reload();
    })
    .catch(error => {
        console.error('오류 발생:', error.message);
        alert(error.message);  // 사용자에게 에러 메시지 표시
    });
}