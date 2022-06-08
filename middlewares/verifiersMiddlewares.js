import db from "../db.js";
import Joi from "joi";


export async function vPostRegisterUser(req,res,next){
    const {name,email, password, confirmPassword } = req.body;

    const schema  = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().alphanum().min(6),
        confirmPassword: Joi.string().required().alphanum().min(6)
    })

    const verifyUser = schema.validate({name,email,password,confirmPassword}).error;

    if(verifyUser){
        res.status(422).send(verifyUser.details[0].message);
        return;
    } 

    next();
}