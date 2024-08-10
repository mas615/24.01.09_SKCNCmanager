var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var db = require('../../db');
//라우팅
const mypage = require('./mypage.js');
router.use("/mypage", mypage);

module.exports = router;
