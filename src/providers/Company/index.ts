import axios from "axios";
import { db } from "../../db";
import { TCompany } from "./types";

export class Company {
    async registerCompany({ cnpj, name }: TCompany) {
        const isRegistered = await db.company.findFirst({
            where: { cnpj }
        })

        if (isRegistered) {
            return {
                message: "🚧Empresa já cadastrada🚧",
                company: isRegistered,
                success: false,
                code: 411
            }
        }

        const company = await db.company.create({
            data: {
                cnpj,
                name,
            }
        })

        return {
            message: "Empresa cadastrada✅",
            company,
            success: false,
            code: 200
        }
    }

    async fetchCompany({ cnpj }: Pick<TCompany, 'cnpj'>): Promise<Partial<Pick<TCompany, 'name'>>> {
        const result = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);

        return { name: result.data.name }
    }
}