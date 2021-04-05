const express = require('express');
const router = express.Router();

const contents = ['おはよう', 'こんにちは', 'さようなら'];

/*
 /posts
  GET 投稿一覧表示
  posts.pug

 /posts/add
  POST 新規投稿 /posts にリダイレクト
  posts.pug

 /posts/delete
  POST 削除 /posts にリダイレクト
  posts.pug

*/

// 投稿一覧の表示
router.get('/', function (req, res, next) {
  res.send('this is posts page.');
});

// 投稿
// 保存後リダイレクト
router.post('/', (req, res, next) => {
  // formのcontentを受け取る
  contents.push(req.body.content);
  res.redirect('/posts');
});


module.exports = router;
