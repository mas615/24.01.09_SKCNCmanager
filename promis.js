var db = require('./skcncmanager/routes/db.js');
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

promis
    .then(console.log)
    .catch(error => {
    console.log("에로가 발생했슴다", error);
});

function fetchUser() {
    return 'ellie';
};

function fetchUser2(){
    return new Promise((resolve, reject) => {
        resolve('ellie');
    });
};

const user = fetchUser();
console.log('에이싱크',user);

const user2 = fetchUser2();
console.log('에이싱크2', user2);
fetchUser2().then(console.log);


sql = 'select manage_code, project_name from project_table where not exists (select 1 from penetrationtest where project_table.manage_code = penetrationtest.manage_code) AND del = "false" order by manage_code';
var a = null;
function dbhi(sql){
    db.query(sql, (error, projectcode, fields) => {
        return projectcode;
    });
};
fundhid = dbhi(sql);
console.log('디비하이',fundhid);


function delay(ms) {
    return new Promise(resolve => setTimeout(() => resolve('딜레이프로미스'), ms));
}

var vardelay = delay(3000);
vardelay.then(del => console.log('딜레이프로미스',del));

