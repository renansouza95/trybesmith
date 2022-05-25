import { Router } from 'express';
import OrderController from '../controllers/order';
import { authenticateToken, authenticateOrder } from '../middlewares/auth';

const router = Router();

const orderController = new OrderController();

router.get('/', orderController.getAll);
router.post('/', authenticateToken, authenticateOrder, orderController.create);

export default router;