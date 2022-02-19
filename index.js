import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import corsOptions from './config/corsOptions.js'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import {connectDB} from './config/connectDb.js';
import dotenv from "dotenv";
import credentials from './middleware/credentials.js'
import postRoutes from './routes/posts.js'

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();


connectDB();

app.use(credentials);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cors());

app.use('/posts', postRoutes);


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB 😆');
    app.listen(PORT, () => console.log(`App is running on PORT ${PORT}`));
});
