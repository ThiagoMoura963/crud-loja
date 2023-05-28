import express from 'express';
import router from './routes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(8080, () => console.log("Servidor rodando na porta 8080"));