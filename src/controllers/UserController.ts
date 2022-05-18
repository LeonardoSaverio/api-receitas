import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { validate } from 'class-validator';

class UserController {

  async create(request: Request, response: Response) {
    const userRepository = getRepository(User);
    const { name, email, password } = request.body;

    const user = userRepository.create({ name, email, password });

    const errors = await validate(user)
    if (errors.length > 0) {
      return response.status(400).json(errors.map(err => err.constraints))
    }

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      return response.sendStatus(409);
    }

    await userRepository.save(user);

    return response.status(200).json(user);

  }
}

export default new UserController();