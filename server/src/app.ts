import express, { Express, Request, Response } from 'express';
import routes from './routes/index';
const app: Express = express();
const port = process.env.PORT || 3000;

// 中間件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

// 路由
app.get('/', (req: Request, res: Response) => {
  res.json({ message: '歡迎使用 Express + TypeScript 服務器！' });
});

// 啟動服務器
app.listen(port, () => {
  console.log(`服務器運行在 http://localhost:${port}`);
});