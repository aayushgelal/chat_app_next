import { Router } from "express";
import { checkUser, signup } from "../controllers/AuthControllers.js";
const router=Router();
router.post('/check-user',checkUser);
router.post('/signup',signup);
export default router;