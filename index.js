import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

const app = express();
dotenv.config();

import userRouter from './routes/userRouter.js';
import urlsRouter from './routes/urlsRouter.js';
import rankingRouter from './routes/rankingRouter.js';

app.use(cors());
app.use(json());
dotenv.config();

app.use(userRouter);
app.use(urlsRouter);
app.use(rankingRouter);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(chalk.green(`Server is running on port ${port}`));
})