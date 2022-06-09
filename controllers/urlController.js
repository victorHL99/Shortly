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

        const creatorId = await db.query(
            `SELECT users.id FROM users
            JOIN sessions
            ON sessions."userId" = users."id"
            WHERE sessions.token = '${token}'`
        );

        const newUrl = nanoid(10);
        console.log(newUrl);

        const response = {
            "shortUrl": `${newUrl}`,
        }

        await db.query(
            `INSERT INTO links ("originalLink","shortlyLink",views, "creatorId") 
            VALUES ($1,$2,$3,$4)`, 
            [url, newUrl, 0, creatorId.rows[0].id]);

        res.status(201).send(response);
        
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function showUrl(req,res){
    
}