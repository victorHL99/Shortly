import { Router } from 'express';

import { registerUrl, showUrl, redirectUrl, deleteUrl} from '../controllers/urlController.js';

import { vPostRegisterUrl } from '../middlewares/verifiersMiddlewares.js';

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", vPostRegisterUrl, registerUrl);
urlsRouter.get("/urls/:id", showUrl);
urlsRouter.get("/urls/open/:shortUrl", redirectUrl);
urlsRouter.delete("/urls/:id", deleteUrl);

export default urlsRouter;