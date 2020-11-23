import express from 'express';
import globalRoutes from './routes/globalRoutes';
import connectDB from './config/db';
import path from 'path';


import 'dotenv/config';


connectDB();

const server = express();
server.use(express.json());

server.use(globalRoutes);
server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads') ))
server.use('/qrcode', express.static(path.resolve(__dirname, '..', 'tmp', 'qrcodes') ))

server.listen(process.env.PORT);