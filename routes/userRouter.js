import {Router} from 'express';

//Imports controllers
import {
    registerUser,
    //loginUser 
} from '../controllers/userController.js';

//Imports Middlewares
import {vPostRegisterUser} from '../middlewares/verifiersMiddlewares.js';

const userRouter = Router();


userRouter.post("/signup",vPostRegisterUser, registerUser);
//userRouter.post("/signin",vPostRegisterUser, loginUser)


export default userRouter;