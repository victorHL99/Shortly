import {Router} from 'express';

import { 
    registerUser, 
    loginUser,
    showAllUrlsForUser  
} from '../controllers/userController.js';

import {
    vPostRegisterUser, 
    vPostLoginUser
} from '../middlewares/verifiersMiddlewares.js';

const userRouter = Router();


userRouter.post("/signup",vPostRegisterUser, registerUser);
userRouter.post("/signin",vPostLoginUser, loginUser);
userRouter.get("/users/:id", showAllUrlsForUser);


export default userRouter;