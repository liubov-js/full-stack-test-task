import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import { getUsers } from './controllers/userController';
import { validateQueryParams } from './validations';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());
app.use(cors());
app.get('/users', validateQueryParams, getUsers);

app.listen(process.env.PORT, () => console.log(`[server]: Server is running on port ${PORT}`));
