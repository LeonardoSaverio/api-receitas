import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


class AuthController {
    async authenticate(request: Request, response: Response) {
        const authRepository = getRepository(User);
        const { email, password } = request.body;

        const user = await authRepository.findOne({ where: { email } });

        if (!user) {
            return response.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return response.sendStatus(401);
        }

        const token = jwt.sign({ id: user.id, name: user.name, email: user.email },
            String(process.env.PRIVATE_KEY),
            { expiresIn: '1d' });

        // @ts-ignore
        delete user.password;

        return response.json({
            user,
            token,
        });

    }
}

export default new AuthController();