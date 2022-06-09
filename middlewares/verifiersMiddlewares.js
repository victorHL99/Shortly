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

export async function vPostLoginUser(req,res,next){
    const { email, password } = req.body;

    const schema  = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().alphanum().min(6),
    })

    const verifyUser = schema.validate({email,password}).error;

    if(verifyUser){
        res.status(422).send(verifyUser.details[0].message);
        return;
    } 

    next();
}

export async function vPostRegisterUrl(req, res, next){
    const { url } = req.body;

    const schema = Joi.object({
        url: Joi.string().required().pattern(/^(http|https):\/\/[^ "]+$/),
    })

    const verifyUrl = schema.validate({url}).error;

    if(verifyUrl){
        res.status(422).send(verifyUrl.details[0].message);
        return;
    }

    next();

}