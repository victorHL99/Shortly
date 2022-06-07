import {Router} from 'express';

//Imports controllers
import {registerUser} from '../controllers/userController.js';

//Imports Middlewares
import {vPostRegisterUser} from '../middlewares/verifiersMiddlewares.js';

const userRouter = Router();

userRouter.post("/signup", registerUser);


export default userRouter;