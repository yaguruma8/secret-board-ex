const express = require('express');
const router = express.Router();

const contents = ['おはよう', 'こんにちは', 'さようなら'];

// 投稿一覧の表示
router.get('/', function (req, res, next) {
  res.render('posts', { contents: contents });
});

// 投稿
// 保存後リダイレクト
router.post('/', (req, res, next) => {
  // formのcontentを受け取る
  contents.push(req.body.content);
  res.redirect('/posts');
});


module.exports = router;
