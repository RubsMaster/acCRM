import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {connectDB} from "./config/mongo-db.js";
import clientsRoutes from './routes/clients.routes.js'

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.use(clientsRoutes);


export default app