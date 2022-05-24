import express from 'express';
import ProductRoutes from './routes/product';
import UserRoutes from './routes/user';
import OrderRoutes from './routes/order';
import LoginRoutes from './routes/login';

const app = express();

app.use(express.json());

app.use('/products', ProductRoutes);
app.use('/users', UserRoutes);
app.use('/orders', OrderRoutes);
app.use('/login', LoginRoutes);

export default app;