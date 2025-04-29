// 블로그 API 예시 (추후 DB 연동 가능)
const express = require('express');
const router = express.Router();

// 블로그 글 목록 반환
router.get('/posts', (req, res) => {
  res.json([
    { id: 1, title: '첫 번째 글', content: '내용입니다.' },
    { id: 2, title: '두 번째 글', content: '또 다른 내용입니다.' },
  ]);
});

module.exports = router;
