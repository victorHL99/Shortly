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
    const { id } = req.params;

    try {
        const result = await db.query(
            `SELECT * FROM links 
            WHERE id = '${id}'`);

        if(result.rows.length === 0){
            res.status(404).send("Url não encontrada");
            return;
        }

        res.status(200).send(result.rows[0]);

    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function redirectUrl(req,res){
    const { shortUrl } = req.params;
    console.log(shortUrl);

    try {
        const result = await db.query(
            `SELECT * FROM links
            WHERE "shortlyLink" = '${shortUrl}'`);

        if(result.rows.length === 0){
            res.status(404).send("Url não encontrada");
            return;
        }

        const link = result.rows[0];
        link.views++;
        await db.query(
            `UPDATE links
            SET views = $1
            WHERE id = $2`,
            [link.views, link.id]);

        res.redirect(link.originalLink);
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function deleteUrl(req,res){
    
}