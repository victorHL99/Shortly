import db from '../db.js';
import bcrypt from 'bcryptjs';

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