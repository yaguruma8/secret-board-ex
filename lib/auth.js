'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcrypt');

const users = new Map();
users.set('admin', '$2b$10$LyYkwW82656.dT3ZPGHkfuePGzTfTzGi8XQeED91Lzeq6m92ZhFMa');
users.set('guest1', '$2b$10$xPvzlkZnVfThgemDvKODw.IW23cMhaiNISjnpI1iqBoR9LulG1q.6');

// 認証
function basicAuth(req, res, next) {
  const reqUser = auth(req);
  if (!reqUser || !check(reqUser.name, reqUser.pass)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="posted_area"');
    res.status(401).send();
  } else {
    next();
  }
}
// ユーザー名とPasswordのチェック
function check(name, pass) {
  // ユーザー名が存在しなければfalse
  if (!users.has(name)) {
    return false;
  }
  return bcrypt.compareSync(pass, users.get(name));
}

module.exports = basicAuth;
