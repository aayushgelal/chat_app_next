import { Router } from "express";
import {
  addFileMessage,
  getMessage,
} from "../controllers/MessageController.js";
import multer from "multer";
const router = Router();
const uploadImage = multer({ dest: "uploads/images" });
router.get("/getmessage", getMessage);
router.post("/addfilemessage", uploadImage.single("image"), addFileMessage);
export default router;
