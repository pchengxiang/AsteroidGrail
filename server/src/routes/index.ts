import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/users', (req: Request, res: Response) => {
  res.json({ users: [] });
});

router.post('/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  // 處理用戶創建邏輯
  res.json({ message: '用戶創建成功' });
});

export default router;