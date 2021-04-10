'use strict';
// モジュールの読み込み
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const favicon = require('serve-favicon');

// ルーターモジュールの読み込み
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const logoutRouter = require('./routes/logout');

// Applicationの作成
const app = express();

// テンプレートエンジンの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// 各種モジュールの設定
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ファビコンの設定
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// ルーティングの設定
app.use('/', indexRouter);
// /postsの接続にはBasic認証をかける
app.use('/posts', postsRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
