import express from 'express';
import cors from 'cors';
import { routes } from '../routes';

const http = express();

http.use(express.json());

http.use(cors());

http.use(routes);

export { http };