import { Router } from 'express';
import ProductController from '../controllers/product';
import { authenticateProduct } from '../middlewares/auth';

const router = Router();

const productController = new ProductController();

router.get('/', productController.getAll);
router.post('/', authenticateProduct, productController.create);

export default router;