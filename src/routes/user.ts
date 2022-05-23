import { Router } from 'express';
import UserController from '../controllers/user';
import { authenticateUser } from '../middlewares/auth';

const router = Router();

const userController = new UserController();

router.post('/', authenticateUser, userController.create);

export default router;