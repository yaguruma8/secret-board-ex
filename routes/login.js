var express = require('express');
var router = express.Router();

/*
  /login
    GET Basic認証
    認証成功したら /posts へリダイレクト

*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;