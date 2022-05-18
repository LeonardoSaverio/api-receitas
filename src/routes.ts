import { Router, Request, Response, response } from 'express';
import multer from "multer";
import multerConfig from './config/multer'; 

import authMiddleware from './middlewares/authMiddleware';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

const router = Router();
const upload = multer(multerConfig);


router.post('/users', UserController.create);
router.post('/auth', AuthController.authenticate);


export default router;