import { Router, Request, Response, response } from 'express';
import multer from "multer";
import multerConfig from './config/multer'; 


const router = Router();
const upload = multer(multerConfig);


router.get('/receitas', (req: Request, res: Response)=> {
    return res.send({
        hello: 'hello world'
    })
} );


export default router;