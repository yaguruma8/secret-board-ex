var express = require('express');
var router = express.Router();

/*
  /
    GET
    index.pug
*/
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
