var express = require('express');
var router = express.Router();
var db = require('../../db');

router.get('/', function(req, res, next) {
    sql = 'select manage_code, project_name from project_table where not exists (select 1 from penetrationtest where project_table.manage_code = penetrationtest.manage_code) order by manage_code';
    db.query(sql, (error, projectcode, fields) => {
        console.log(projectcode);
        var dropdata = [];
        for(const projectcodekey of projectcode){
          pushdata = `[${projectcodekey.manage_code}] : ${projectcodekey.project_name}`;
          dropdata.push(pushdata);
        };
        var body = `<button onclick="aalert()">저장</button><button id="addButton">취약점 행 추가</button><br>진단차수<div id="table1" class="hot"></div>취약점<div id="table2" class="hot"></div>`;
        var script = `<script src="/handsontable/handsontable.full.js"></script>
        <script> const js_detailtest = ${JSON.stringify(dropdata)}</script>
        <script src="/js/js_detailtest.js"></script>
        `;
        res.render('tmpgrid', { title : "모의해킹 종합", head : null, body : body, script : script});
    });
});

module.exports = router;