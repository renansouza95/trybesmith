import express from 'express';
import ProductRoutes from './routes/product';
import UserRoutes from './routes/user';
import OrderRoutes from './routes/order';

const app = express();

app.use(express.json());

app.use('/products', ProductRoutes);
app.use('/users', UserRoutes);
app.use('/orders', OrderRoutes);

export default app;