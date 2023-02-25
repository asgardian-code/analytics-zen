import axios from "axios";
import { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import { isCNPJ } from 'brazilian-values';
import { Company } from "../../providers/Company";

const controller = async (req: Request, res: Response) => {
    const { cnpj } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const result = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
        const companyProvider = new Company();
        const { nome: name } = result.data;

        const registered = await companyProvider.registerCompany({ cnpj, name })

        return res.status(201).json(registered);
    } catch (err: any) {
        console.log(`[COMPANY] - ${JSON.stringify(err, null, 2)}`);

        return res.status(400).json({
            message: "[COMPANY] - 🚧Aguarde 1 minuto🚧",
            success: false,
            code: 410
        });
    }
};


const validations = [
    body('cnpj')
        .isNumeric({ no_symbols: true })
        .withMessage('apenas números')
        .isLength({ min: 14, max: 14 })
        .withMessage('deve conter 14 characteres')
        .custom(isCNPJ)
        .withMessage('deve ser um cnpj válido'),
]

export const company = [
    ...validations,
    controller,
]