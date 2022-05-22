import express from 'express';
import ProductRoutes from './routes/product';

const app = express();

app.use(express.json());

app.use('/products', ProductRoutes);

export default app;