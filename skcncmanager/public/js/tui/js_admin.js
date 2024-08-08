const grid = new tui.Grid({
    el: document.getElementById('grid'),
    data: data,
    scrollX: false,
    scrollY: false,
    columns: [
        { header: 'Seq', name: 'seq', width: 'auto' },
        { header: '아이디', name: 'id', width: 'auto', editor: 'text' },
        { header: '비번', name: 'pw', width: 'auto', editor: 'text' },
        { header: '이름', name: 'name', width: 'auto', editor: 'text' },
        { header: '레벨', name: 'level', width: 'auto', editor: 'text'},
        { header: '마지막로그인', name: 'lastlogin', width: 'auto', editor: 'text' },
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
      .then(response => response.json())
      .then(data => {console.log(data.err.errno)});
}