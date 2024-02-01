var express = require('express');
var router = express.Router();

const projects = require('./projects.js');
const insert = require('./insert.js');
const penetrationtest = require('./penetrationtest.js');

router.use("/projects", projects);
router.use("/insert", insert);
router.use("/penetrationtest", penetrationtest);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
