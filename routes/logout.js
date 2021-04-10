var express = require('express');
var router = express.Router();

/*
  /logout
    GET Basic認証の解除 2-3秒後に / へリダイレクト
    logout.pug 
*/

// ログアウト
router.get('/', function (req, res, next) {
  res.render('logout');
});

module.exports = router;
