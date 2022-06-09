import db from '../db.js';
import { nanoid } from 'nanoid';

export async function registerUrl(req,res){
    const {url} = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();

    

    try{
        const resultSession = await db.query(`SELECT * FROM sessions WHERE token = '${token}'`);
        if(resultSession.rows.length === 0){
            res.status(401).send("Token inválido");
            return;
        }

        const newUrl = nanoid(10);
        console.log(newUrl);

        const response = {
            "shortUrl": `${newUrl}`,
        }

        res.status(201).send(response);


    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}