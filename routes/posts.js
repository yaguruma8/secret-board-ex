const express = require('express');
const router = express.Router();

const contents = ['おはよう', 'こんにちは', 'さようなら'];

/* GET post page. */
router.get('/', function (req, res, next) {
  res.render('posts', { contents: contents });
});

router.post('/', (req, res, next) => {
  // formのcontentを受け取る
  contents.push(req.body.content);
  redirect(req, res);
});

function redirect(req, res) {
  console.info('redirect');
  res.writeHead(303, {
    Location: '/posts',
  });
  res.end();
}

module.exports = router;
