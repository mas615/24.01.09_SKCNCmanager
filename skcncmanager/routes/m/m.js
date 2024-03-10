var express = require('express');
var router = express.Router();

const projects = require('./projects.js');
const insert = require('./insert.js');
const projectsedit = require('./projectsedit.js');
const penetrationtest = require('./penetrationtest/penetrationtest.js');
const api = require('./api/api.js');

router.use("/projects", projects);
router.use("/insert", insert);
router.use("/projectsedit", projectsedit);
router.use("/penetrationtest", penetrationtest);
router.use("/api", api);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
