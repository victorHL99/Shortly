import db from '../db.js';

export async function registerUser(req, res) {
    const {name,email, password, confirmPassword } = req.body;

    try{
        const resultUsers = await db.query('SELECT * FROM users WHERE name = $1', [name]);
        if(resultUsers.rows.length > 0){
            res.status(409).send("Usuario já cadastrado");
            return;
        } 
        res.sendStatus(201)
    } catch(error){
        res.sendStatus(500);
    }
}