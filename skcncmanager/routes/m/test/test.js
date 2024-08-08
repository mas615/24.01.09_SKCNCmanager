var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var db = require('../../db');
//라우팅
// const detail = require('./detail.js');

// router.use("/detail", detail);

router.get('/', function(req, res, next) {
  sql = `select * from project_table`
  db.query(sql,(error, rows, fields)=>{
    body = `<div id="grid"></div>`
    script = `
      <link rel="stylesheet" href="/tui/tui-grid.css" />
      <script>const gridData = ${JSON.stringify(rows)}</script>
      <script src="/tui/tui-grid.js"></script>
      <script src="/js/tui/js_test.js"></script>`
    res.render('tmpgrid3', { title : "모의해킹 종합", head : "null", body : body, script : script, user : req.user.username});
  });
  
});

module.exports = router;
