import db from '../db.js';

export async function registerUser(req, res) {
    const {name,email, password, confirmPassword } = req.body;

    try{
        
        res.sendStatus(201)
    }
}