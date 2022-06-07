import db from "../db.js";
import Joi from "joi";


export async function vPostRegisterUser(req,res,next){
    const {name,email, password, confirmPassword } = req.body;

    const schema  = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().alphanum().min(6),
        confirmPassword: Joi.string().required().alphanum().min(6)
    })

    const verifyUser = schema.validate({name,email,password,confirmPassword}).error;

    if(verifyUser){
        res.status(422).send(verifyUser)
    }

    try{
        const resultUsers = await db.query('SELECT * FROM users WHERE name = $1', [name]);
        if(resultUsers.rows.length > 0){
            res.sendStatus(409);
            return;
        } else {
            next();
        }
    } catch(error){
        res.sendStatus(500);
    }
}