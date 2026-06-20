import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { analyzeImageQuestion } from "../controllers/uploadController.js";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype?.startsWith("image/")) {
      cb(null, true);
      return;
    }

    cb(new Error("Only image uploads are supported."));
  },
});

router.post("/", upload.single("image"), analyzeImageQuestion);

export default router;
