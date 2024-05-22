import express, { Request, Response } from 'express';
import cors from 'cors';
// All The Base Routes
import ProductRoutes from './app/modules/products/product.route';
import OrderRoutes from './app/modules/orders/order.route';

const app = express();
app.use(express.json());
app.use(cors());

// All The Routes

app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.all('*', (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, message: `${req.url} Route Is Not Found` });
});
export default app;
