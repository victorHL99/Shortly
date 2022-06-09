import { Router } from 'express';

import { registerUrl, showUrl } from '../controllers/urlController.js';

import { vPostRegisterUrl } from '../middlewares/verifiersMiddlewares.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", vPostRegisterUrl, registerUrl);
urlsRouter.get("/urls/:id", showUrl);

export default urlsRouter;