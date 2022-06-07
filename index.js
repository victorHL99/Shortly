import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

const app = express();

//Imports routers
import signupRouter from './routes/signupRouter.js';

app.use(cors());
app.use(json());
dotenv.config();

//Routes for the API
app.use(signupRouter);

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(chalk.green(`Server is running on port ${port}`));
})