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
}