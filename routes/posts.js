const express = require('express');
const router = express.Router();
const Post = require('../model/postModel');

// const posts = [
//   { id: 1, name: 'taro', content: 'おはようございます。', date: '2021/1/1' },
//   { id: 2, name: 'hanako', content: '今日も一日元気です。', date: '2021/2/2' },
//   { id: 3, name: 'jiro', content: 'ありがとう。', date: '2021/3/3' },
// ];

/*

 /posts/add
  POST 新規投稿 /posts にリダイレクト
  posts.pug

*/

// GET 投稿一覧表示
router.get('/', function (req, res, next) {
  Post.findAll().then((posts) => {
    res.render('posts', { posts: posts, user: req.user });
  });
});

// POST 削除
router.post('/delete', (req, res, next) => {
  res.send('delete!!!');
  // TODO: 削除後 /posts にリダイレクト
})

// POST 新規投稿
router.post('/add', (req, res, next) => {
  console.log(req.body.content);
  Post.create({
    content: req.body.content,
    postedBy: req.user,
    trackingCookie: null
  }).then(() => {
    res.redirect('/posts');
  })
})

module.exports = router;
