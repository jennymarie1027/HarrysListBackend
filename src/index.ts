import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';
import path from 'path';

const app = express();
app.set('view engine', 'ejs');

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = http.createServer(app);

const MONGO_URL =
  'mongodb+srv://jenny:admin@cluster0.zxqbvge.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));


server.listen(8081, () => {
  console.log('server running on http://localhost:8081');
});

app.use('/', router());
