// src/index.ts
import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from './database';
import router from './routes/auth';

const app = express();
app.use(bodyParser.json());

connectDatabase();

app.use('/api/auth', router); // Use the router for all /api routes

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
