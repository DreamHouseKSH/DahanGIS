// ERP API 예시 (추후 DB 연동 가능)
const express = require('express');
const router = express.Router();

// ERP 데이터 예시 반환
router.get('/data', (req, res) => {
  res.json({
    message: 'ERP 데이터 예시입니다.'
  });
});

module.exports = router;
