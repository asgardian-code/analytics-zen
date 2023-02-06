import { Router, Response } from 'express';
import { company } from '../controllers/company';

const routes = Router();

routes.get('/analytics', (_, response: Response) => {
    response.status(200).json({
        message: '[ANALYTICS] - working!💹'
    })
});

routes.post('/company', ...company);

export { routes }