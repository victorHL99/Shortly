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
        console.log(error);
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
        console.log(user.id)

        if(!isPasswordValid){
            res.status(401).send("Senha incorreta");
            return;
        }

        const token = v4();
        console.log(token);

        await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1,$2)`, [token, user.id]);

        res.status(200).send(token);
    } catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}