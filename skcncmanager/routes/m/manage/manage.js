var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var db = require('../../db');
//라우팅
const userip = require('./userip.js');

router.use("/userip", userip);

module.exports = router;
