import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import AppRouter from './Routes/router.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/app/',AppRouter);

app.get('/', (req, res)=>{
    res.send("Hello");
})

const PORT = process.env.PORT || 9000;

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`)
})