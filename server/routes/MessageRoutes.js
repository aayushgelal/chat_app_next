import { Router } from "express";
import { addMessage } from "../controllers/MessageController.js";

const router = Router();
router.post("/addmessage", addMessage);
export default router;
