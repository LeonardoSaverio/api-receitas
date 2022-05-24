import { Request, Response } from 'express';
import { getManager, getRepository, Equal } from 'typeorm';
import { isUUID, validate } from 'class-validator';

import Ingrediente from '../models/Ingrediente';
import Receita from '../models/Receita';
import receitaView from '../views/receita-view'; 

class ProductController {

    async create(request: Request, response: Response) {
        const user = request.user;
        let { name, difficult, preparation, ingredientes } = request.body;
        const receitaRepository = getRepository(Receita);

        ingredientes = JSON.parse(ingredientes)
        const requestImages = request.files as Express.Multer.File[];

        const photos = requestImages.map((image) => {
            return image.filename;
        });

        const receita = receitaRepository.create({ name, difficult, preparation, ingredientes, user, photos })
        const receitaErrors = await validate(receita)
        if (receitaErrors.length > 0) {
            return response.status(400).json(receitaErrors.map(err => err.constraints));
        }
        const result = await receitaRepository.save(receita)
        return response.json(result);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;

        if (!isUUID(id)) {
            return response.sendStatus(404);
        }

        let { name, difficult, preparation, ingredientes } = request.body;
        const requestImages = request.files as Express.Multer.File[];

        const photos = requestImages.map((image) => {
            return image.filename;
        });

        const receitaRepository = getRepository(Receita);

        const receita = await receitaRepository.findOne(id);

        if (!receita) {
            return response.sendStatus(404);
        }

        receita.name = name ? name : receita.name
        receita.difficult = difficult ? difficult : receita.difficult
        receita.preparation = preparation ? preparation : receita.preparation
        receita.photos = photos.length > 0 ? photos : receita.photos
        receita.ingredientes = photos.length > 0 ? JSON.parse(ingredientes) : receita.ingredientes

        const receitaErrors = await validate(receita)
        if (receitaErrors.length > 0) {
            return response.status(400).json(receitaErrors.map(err => err.constraints));
        }

        const result = await receitaRepository.save(receita)
        return response.json(result);
    }

    async index(request: Request, response: Response) {
        const receitaRepository = getRepository(Receita);
        let receitas: Receita[];

        receitas = await receitaRepository.find();

        return response.status(200).json(receitaView.renderMany(receitas));
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        if (!isUUID(id)) {
            return response.sendStatus(404);
        }
        const receitaRepository = getRepository(Receita);
        const receita = await receitaRepository.findOne(id);
        if (!receita) {
            return response.sendStatus(404);
        }
        return response.status(200).json(receitaView.render(receita));
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        const receitaRepository = getRepository(Receita);
        try {
            const receitaExists = await receitaRepository.findOne(id);
            if (!receitaExists) {
                return response.sendStatus(404);
            }

            await receitaRepository.delete(id);

            return response.sendStatus(204);

        } catch (err) {
            console.error(err);
            return response.sendStatus(404);
        }
    }

    async findReceitasByUser(request: Request, response: Response) {
        const user = request.user;

        const receitaRepository = getRepository(Receita);
        let receitas: Receita[];

        receitas = await receitaRepository.find({ where: { user } });

        return response.status(200).json(receitaView.renderMany(receitas));
    }

}

export default new ProductController();