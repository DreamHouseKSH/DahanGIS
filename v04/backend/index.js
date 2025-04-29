import express from 'express';
import cors from 'cors';

// 라우터 추가
import blogRouter from './blog.js';
import boardRouter from './board.js';
import erpRouter from './erp.js';

const app = express();
const PORT = process.env.PORT || 4000;

// 모든 도메인에 대해 CORS 허용 (필요 시 origin 옵션으로 제한 가능)
app.use(cors());

// API 라우트 등록
app.use('/api/blog', blogRouter);
app.use('/api/board', boardRouter);
app.use('/api/erp', erpRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Backend API server running on port ${PORT}`);
});
