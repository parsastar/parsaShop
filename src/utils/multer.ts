import multer from "multer";
import path from "path";
import fs from "fs";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync("public/upload", { recursive: true });
    console.log("create disk");
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    console.log(file);

    const ext = path.extname(file.originalname);
    const whiteListFormat = [".png", ".webp", ".jpeg", ".jpg"];
    if (whiteListFormat.includes(ext)) {
      const fileName = Date.now() + ext;
      cb(null, fileName);
    } else {
      cb(
        new Error("allowed formats : '.png .webp .jpeg .jpg' "),
        file.originalname
      );
    }
  },
});

const _1MB = 1 * 1000 * 1000;
const _2MB = 2 * 1000 * 1000;
const _3MB = 3 * 1000 * 1000;
const _200KB = 200000;

export const uploadFile = multer({
  storage,
  limits: { fileSize: _3MB },
}).single("image");
