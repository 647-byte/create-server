import express from 'express';
import mainRouter from './routes/index.route.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { middleAddDate,middlePrintDate } from './middlewares/main.middlewares.js';
import { errorHandler,notFoundURLHandler } from './middlewares/error.middlewares.js';
import { connectDB } from './config/db.js';
const app = express();
connectDB();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(middleAddDate);
// app.get('(.*)',middlePrintDate);
app.get('/', (req, res) => {
    res.send("hello to library");
})
app.use('/api', mainRouter);
app.use(notFoundURLHandler);
app.use(errorHandler);
app.listen(5000); 