const express = require('express');
const router = express.Router();
const Post = require('../model/postModel');
const moment = require('moment');

/*

 /posts/add
  POST 新規投稿 /posts にリダイレクト
  posts.pug

*/

// GET 投稿一覧表示
router.get('/', function (req, res, next) {
  // 降順（新しい順）で表示する
  Post.findAll({ order: [['id', 'DESC']] }).then((posts) => {
    const userName = getUserName(req);
    posts.forEach((post) => {
      post.formattedCreatedAt = moment(post.createdAt)
        .utcOffset(8)
        .format('YYYY/MM/DD HH:mm:ss');
    });
    res.render('posts', { posts: posts, userName: userName });
  });
});

// POST 削除
router.post('/delete', (req, res, next) => {
  console.log(req.body.id);
  res.send('delete!!!');
  // TODO: 削除後 /posts にリダイレクト
});

// POST 新規投稿
router.post('/add', (req, res, next) => {
  Post.create({
    content: req.body.content,
    postedBy: getUserName(req),
    trackingCookie: null,
  }).then(() => {
    res.redirect('/posts');
  });
});

// 認証したユーザー名の取得
function getUserName(req) {
  // Authorizationヘッダーからuser:passを取得
  const data = req.get('Authorization').split(' ')[1];
  // Base64のデコードはBufferを使う
  const size = Buffer.byteLength(data, 'base64');
  const userDataStr = Buffer.alloc(size, data, 'base64').toString();
  return userDataStr.split(':')[0];
}

module.exports = router;
