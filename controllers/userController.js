import db from '../db.js';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

export async function registerUser(req, res) {
    const {name,email, password, confirmPassword } = req.body;

    try{
        const encryptedPassword = await bcrypt.hashSync(password, 10);
        const resultUsers = await db.query(`SELECT * FROM users WHERE email = '${email}'`);

        if(resultUsers.rows.length > 0){
            res.status(409).send("Usuario já cadastrado");
            return;
        } 
        if(password !== confirmPassword){
            res.status(409).send("Senhas não conferem");
            return;
        }
        
        const user = await db.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`, [name,email,encryptedPassword]);
        res.sendStatus(201)
    } catch(error){
        res.sendStatus(500);
    }
}

export async function loginUser(req, res) {
    const {email, password} = req.body;

    try{
        const resultUser = await db.query(`SELECT * FROM users WHERE email = '${email}'`);

        if(resultUser.rows.length === 0){
            res.status(401).send("Usuario não cadastrado");
            return;
        }

        const user = resultUser.rows[0];
        const isPasswordValid = await bcrypt.compareSync(password, user.password);

        if(!isPasswordValid){
            res.status(401).send("Senha incorreta");
            return;
        }

        const token = v4();

        await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1,$2)`, [token, user.id]);

        res.status(200).send(token);
    } catch(error){
        res.sendStatus(500);
    }
}

export async function showAllUrlsForUser(req,res){
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    const { id } = req.params;

    try {
        if(!token){
            res.status(401).send("Não autorizado");
            return;
        }

        const resultSession = await db.query(`SELECT * FROM sessions WHERE token = '${token}'`);
        if(resultSession.rows.length === 0){
            res.status(404).send("Usuário não encontrado");
            return;
        }

        const creatorInfo = await db.query(`
            SELECT users.id, users.name FROM users
            JOIN sessions
            ON sessions."userId" = users."id"
            WHERE sessions.token = '${token}'
            `);

        const resultLinks = await db.query(`
            SELECT * FROM links
            WHERE "creatorId" = '${resultSession.rows[0].userId}'
        `);

        const SumViews = await db.query(`
            SELECT SUM(views) FROM links
            WHERE "creatorId" = '${resultSession.rows[0].userId}'
        `);


        const arrayLinks = resultLinks.rows.map(link => {
            return {
                "id": link.id,
                "url": link.originalLink,
                "shortUrl": link.shortlyLink,
                "visitCount": link.views,
            }
        });

        const response = {
            "id": creatorInfo.rows[0].id,
            "name": creatorInfo.rows[0].name,
            "visitCount": SumViews.rows[0].sum,
            "shortenedUrls": arrayLinks,
        }

        res.status(200).send(response)
    } catch(error){
        res.sendStatus(500);
    }
}