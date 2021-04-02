var express = require('express');
var router = express.Router();

// 投稿の削除
// 削除後 /post へリダイレクト
router.get('/', function(req, res, next) {
  res.send('this is delete page.');
});

module.exports = router;
