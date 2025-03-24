import multer from "multer";
import { InputError } from "./customError";
import path from "path";

//better than overloading memory buffer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../videos"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const allowedExts = [
  "MP4",
  "MOV",
  "MKV",
  // for testing
  "JPG",
];

export const uploadSingleVideo = multer({
  fileFilter: (req, file, cb) => {
    const fileExt = file.originalname.substring(
      file.originalname.lastIndexOf(".") + 1
    );
    if (allowedExts.includes(fileExt.toUpperCase())) {
      cb(null, true);
    } else {
      cb(
        new InputError(undefined, undefined, { message: "Invalid file format" })
      );
    }
  },
  storage: storage,
  limits: {
    fileSize: 209715200, //200MB
  },
}).single("video");
