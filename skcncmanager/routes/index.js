var express = require('express');
var router = express.Router();

const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'skcncmanagerdb'
});

connection.connect();
var dbtest
connection.query('SELECT * from project_table', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
  dbtest = rows;
  for (const key of dbtest){
    console.log("asdfasdfasdfasdfasdf", key.seq);
  };
});
connection.end();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express majun', dbtest: dbtest, method: "get"});
});

router.post('/', (req, res, next) => {
  var values = []
  for (const key in req.body){
    console.log(key)
    console.log(req.body[key])
    if (key === 17 || key === 18 || key === 19 || key === 21 || key === 22 || key === 23 || key === 24 || key === 25 || key === 26 || key === 27 || key === 29) {
      values.push(Boolean(req.body[key]))
    } else {
      values.push(String(req.body[key]))
    };
  };
  console.log("포스트로 접속함");
  console.log(values)  
  var sql = "INSERT INTO project_table (project_code, service_code, manage_code, project_name, new_inspectiontype, old_inspectiontype, open_date, relative_comp, comp1, part1, manager1, manager1_phone, comp2, part2, manager2, manager2_phone, pentest, source_code, infra, note, check1, check2, check3, check4, check5, check6, check7, old_manage_code, old_project) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  //db insert
  //connection.connect();
  connection.query(sql,values,function(err, rows, fields) {
    if (err){
      console.log(err);
    }
    else{
      console.log(rows.insertId);
    }
  });
  //connection.release();

  res.render('index', { title: 'Express majun', dbtest: dbtest, method: "post"  });
});


module.exports = router;
