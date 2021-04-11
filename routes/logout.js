var express = require('express');
var router = express.Router();

/*
  /logout
    GET 
    Basic認証の解除
    todo:2-3秒後に / へリダイレクト
    logout.pug 
*/

// ログアウト
router.get('/', function (req, res, next) {
  res.status(401).render('logout');
});

module.exports = router;
