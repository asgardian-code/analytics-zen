import axios from "axios";
import { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import { isCNPJ } from 'brazilian-values';

const controller = async (req: Request, res: Response) => {
    const { cnpj } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const result = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`)

        return res.status(201).json({
            message: result.data,
            success: true,
            code: 201
        });
    } catch (err: any) {
        return res.status(400).json({
            message: "🚧Aguarde 1 minuto🚧",
            success: false,
            code: 410
        });
    }
};


const validations = [
    body('cnpj').isNumeric({ no_symbols: true }).isLength({ min: 14, max: 14 }).custom(isCNPJ),
]

export const company = [
    ...validations,
    controller,
]