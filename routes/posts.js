const express = require('express');
const router = express.Router();
const Post = require('../model/postModel');
const moment = require('moment');
const Cookies = require('cookies');

const trackingIdKey = 'tracking_id';

// GET 投稿一覧表示
router.get('/', function (req, res, next) {
  // cookieの取得
  const cookies = new Cookies(req, res);
  addTrackingCookie(cookies);

  // 降順（新しい順）で表示する
  Post.findAll({ order: [['id', 'DESC']] }).then((posts) => {
    const userName = getUserName(req);
    posts.forEach((post) => {
      post.formattedCreatedAt = moment(post.createdAt)
        .utcOffset(8)
        .format('YYYY/MM/DD HH:mm:ss');
      post.formattedPostedName =
        post.postedBy === 'admin'
          ? '管理人★'
          : Number.parseInt(post.trackingCookie, 10).toString(16);
    });
    res.render('posts', { posts: posts, userName: userName });
  });
});

// POST 新規投稿
router.post('/add', (req, res, next) => {
  const cookies = new Cookies(req, res);
  Post.create({
    content: req.body.content,
    postedBy: getUserName(req),
    trackingCookie: cookies.get(trackingIdKey),
  }).then(() => {
    res.redirect('/posts');
  });
});

// POST 削除
router.post('/delete', (req, res, next) => {
  Post.findByPk(req.body.id).then((post) => {
    post.destroy().then(() => {
      console.info('削除されました');
      res.redirect('/posts');
    });
  });
});

// ユーティリティ関数
// 認証したユーザー名の取得
function getUserName(req) {
  // Authorizationヘッダーからuser:passを取得
  const data = req.get('Authorization').split(' ')[1];
  // Base64のデコードはBufferを使う
  const size = Buffer.byteLength(data, 'base64');
  const userDataStr = Buffer.alloc(size, data, 'base64').toString();
  return userDataStr.split(':')[0];
}

// cookieをセットする
function addTrackingCookie(cookies) {
  // cookieが取得できない時のみ新しく作成する
  if (cookies.get(trackingIdKey)) {
    return;
  }
  const trackingId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  // 当日中は同じtracking_idにする
  const now = new Date();
  const limit = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  cookies.set(trackingIdKey, trackingId, { expires: limit });
}

module.exports = router;
