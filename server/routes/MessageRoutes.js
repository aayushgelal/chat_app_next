import { Router } from "express";
import {
  addFileMessage,
  getMessage,
} from "../controllers/MessageController.js";
import multer from "multer";
const router = Router();
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
const uploadImage = multer({ storage: multerStorage });

router.get("/getmessage", getMessage);
router.post("/addfilemessage", uploadImage.single("image"), addFileMessage);
export default router;
