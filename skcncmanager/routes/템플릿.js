var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var title = "타이틀"
    var head = "헤드"
    var body = "바디"
    res.render('tmp', { title : title, head : head, body : body});
});

module.exports = router;
