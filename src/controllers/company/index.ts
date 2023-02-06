import { Request, Response } from "express";
import { body, validationResult } from 'express-validator';

const controller = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    return res.status(201).json({
        company: '🚧aqui irá as informações da empresa🚧',
        status: 'success',
        code: 201
    });
};


const validations = [
    body('cnpj').isAlphanumeric('pt-BR').isLength({ min: 14, max: 14 }),
]

export const company = [
    ...validations,
    controller,
]