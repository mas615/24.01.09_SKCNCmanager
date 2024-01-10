var express = require('express');
var router = express.Router();
const insert = require('./insert.js');

router.use("/insert", insert);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
