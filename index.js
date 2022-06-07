import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';

const app = express();

app.use(cors());
app.use(json());
dotenv.config();

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(chalk.green(`Server is running on port ${port}`));
})