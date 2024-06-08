var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var db = require('../../db');
//라우팅
const userip = require('./userip.js');
const daily = require('./daily.js');
const daily1 = require('./daily1.js');
const daily2 = require('./daily2.js');
const daily3 = require('./daily3.js');

router.use("/userip", userip);
router.use("/daily", daily);
router.use("/daily1", daily1);
router.use("/daily2", daily2);
router.use("/daily3", daily3);

module.exports = router;
