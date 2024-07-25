import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import { connectDatabase } from './database';
import { createUser, loginUser } from './controller/authController';

const app = express();
app.use(bodyParser.json());

connectDatabase();

app.post('/register', createUser);
app.post('/login', loginUser);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
