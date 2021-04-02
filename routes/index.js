var express = require('express');
var router = express.Router();

// ログイン　認証後に /posts へリダイレクトする
// 認証済みなら そのまま/postsへリダイレクト
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
