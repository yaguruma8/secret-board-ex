const express = require('express');
const router = express.Router();

const posts = [
  { id: 1, name: 'taro', content: 'おはようございます。', date: '2021/1/1' },
  { id: 2, name: 'hanako', content: '今日も一日元気です。', date: '2021/2/2' },
  { id: 3, name: 'jiro', content: 'ありがとう。', date: '2021/3/3' },
];

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
  res.render('posts', { posts: posts });
});

// 投稿
// 保存後リダイレクト
router.post('/', (req, res, next) => {
  // formのcontentを受け取る
  contents.push(req.body.content);
  res.redirect('/posts');
});

module.exports = router;
