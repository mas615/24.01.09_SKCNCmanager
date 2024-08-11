function collectFormData() {
    let formDataArray = [];
    const formElements = document.querySelectorAll('#mypassword input');
    formElements.forEach(element => {
        formDataArray.push(element.value);
    });
    if(formDataArray[1] != formDataArray[2]){
        alert("신규 패스워드를 다시 입력해주세요.")
        console.log(formDataArray)
    }else{
        fetch('/m/api/insert/mypassword', {
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
                        case 9999:
                            errorMessage = err.message;
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
            alert("패스워드 변경 완료")
            location.href = '/';
        })
        .catch(error => {
            console.error('오류 발생:', error.message);
            alert(error.message);  // 사용자에게 에러 메시지 표시
        });
    };
}