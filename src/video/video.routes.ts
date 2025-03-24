import express from "express";
import { VideoController } from "./video.controller";
import { validator } from "../middlewares/validator";
import { asyncHandler } from "../utils/asyncHandler";
import { authHandler } from "../middlewares/authHandler";
import { VideoService } from "./video.service";
import { FindVideoDto, ListVideoDto, UploadVideoDto } from "./video.dto";
import { uploadSingleVideo } from "../utils/multerHanlder";

const router = express.Router();
const videoService = new VideoService();
const videoController = new VideoController(videoService);

router.post(
  "/upload",
  authHandler(),
  uploadSingleVideo,
  validator(UploadVideoDto),
  asyncHandler(videoController.uploadVideo)
);
router.get(
  "/list",
  validator(ListVideoDto),
  asyncHandler(videoController.getVideos)
);
router.get(
  "/one",
  authHandler(),
  validator(FindVideoDto),
  asyncHandler(videoController.getVideo)
);
router.delete("/:id", authHandler(), asyncHandler(videoController.deleteVideo));

export default router;
