import { Router } from 'express';
import LoginController from '../controllers/login';
import { authenticateLogin } from '../middlewares/auth';

const router = Router();

const loginController = new LoginController();

router.post('/', authenticateLogin, loginController.getByUser);

export default router;