import { Router, Request, Response, response } from 'express';
import multer from "multer";
import multerConfig from './config/multer';

import authMiddleware from './middlewares/authMiddleware';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

import ReceitaController from './controllers/ReceitaController';

const router = Router();
const upload = multer(multerConfig);


router.post('/register', UserController.create);
router.post('/auth', AuthController.authenticate);

router.post('/receitas', upload.array('photos'), authMiddleware, ReceitaController.create);
router.get('/receitas', authMiddleware, ReceitaController.index);
router.get('/receitas/:id', authMiddleware, ReceitaController.show);
router.get('/receitas/user/:id', authMiddleware, ReceitaController.findReceitasByUser);
router.put('/receitas/:id',  upload.array('photos'), authMiddleware, ReceitaController.update);
router.delete('/receitas/:id', authMiddleware, ReceitaController.delete);

router.get('/user/receitas', authMiddleware, ReceitaController.findReceitasByUser);






export default router;