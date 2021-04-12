'use strict';

const auth = require('basic-auth');
const compare = require('tsscmp');

const users = new Map();
users.set('admin', 'opensesami');
users.set('guest1', '1234');

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
  return users.has(name) && compare(pass, users.get(name));
}

module.exports = basicAuth;
