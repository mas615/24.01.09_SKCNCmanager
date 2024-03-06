var db = require('../../db');
console.log(123);


sql = 'select "fuck"';
var a
db.query(sql , (error, projectcode, fields) => {
    console.log("안쪽",projectcode);
    a = projectcode;
});
console.log("밖",a);
setTimeout(() => {console.log("딜레이",a)}, 3000);

const promis = new Promise((resolve, reject) => {
    console.log('doing somthinge...');
    sql2 = 'select user()';
    db.query(sql2 , (error, projectcode, fields) => {
        if(error){
            reject(error);
        }else{
            resolve(projectcode);
        };
    });
});

promis.then(console.log
).catch(error => {
    console.log("에로가 발생했슴다", error);
});
