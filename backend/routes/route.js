import express, { Router } from 'express';
import { getUser, login, logout, singUp } from '../controller/auth.js';
import { checkAuth } from '../middlewares/checkauth.js';
const authRouter =  express.Router();
authRouter.post('/signup',(singUp))
authRouter.post('/login',(login))
authRouter.post('/logout', (logout))
authRouter.get('/getuserdata', checkAuth,getUser)
export default authRouter;