var express = require('express');
var router = express.Router();
const m = require('./m/m');

router.use("/m",m);

router.get('/', function(req, res, next) {
  body = `<h>SK C&C MANAGER</h>`
  res.render('tmp', { title: 'SK C&C MANAGER', head: "", body: body });
});

module.exports = router;