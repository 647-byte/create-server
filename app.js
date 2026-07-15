import express from 'express';
import mainRouter from './routes/index.route.js'
const app = express();
app.use(express.json());
app.use('/api', mainRouter);
app.get('/', (req, res) => {
    res.send("hello to library");
})
app.listen(5000); 