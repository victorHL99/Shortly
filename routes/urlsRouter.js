import { Router } from 'express';

import { registerUrl } from '../controllers/urlController.js';

import { vPostRegisterUrl } from '../middlewares/verifiersMiddlewares.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", vPostRegisterUrl, registerUrl);

export default urlsRouter;