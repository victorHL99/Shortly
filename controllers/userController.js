import db from '../db.js';

export async function registerUser(req, res) {
    console.log("passou aqui controller");
    const {name,email, password, confirmPassword } = req.body;

    try{
        const user = await db.query(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`, [name,email,password]);
        res.sendStatus(201)
    } catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}