import { Router } from "express";
import { getMessage } from "../controllers/MessageController.js";

const router = Router();
router.get("/getmessage", getMessage);
export default router;
