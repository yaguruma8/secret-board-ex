var express = require('express');
var router = express.Router();

// ログアウト
router.get('/', function (req, res, next) {
  res.send('this is logout page');
});

module.exports = router;
