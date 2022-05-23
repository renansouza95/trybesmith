import express from 'express';
import ProductRoutes from './routes/product';
import UserRoutes from './routes/user';

const app = express();

app.use(express.json());

app.use('/products', ProductRoutes);
app.use('/users', UserRoutes);

export default app;