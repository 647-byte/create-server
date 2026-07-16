import express from 'express';
import mainRouter from './routes/index.route.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { middleAddDate } from './middlewares/mainMiddlewares.js';
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(middleAddDate);
app.use('/api', mainRouter);
app.get('/', (req, res) => {
    res.send("hello to library");
})
app.listen(5000); 