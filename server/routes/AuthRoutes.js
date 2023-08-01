import { Router } from "express";
import { checkUser, getUsers, signup } from "../controllers/AuthControllers.js";
const router = Router();
router.post("/login", checkUser);
router.post("/signup", signup);
router.get("/getusers", getUsers);

export default router;
