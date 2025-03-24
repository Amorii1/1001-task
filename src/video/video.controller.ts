import { Request, Response, NextFunction } from "express";
import { AlreadyExistsError, InputError } from "../utils/customError";
import { ListVideoDto, UploadVideoDto } from "./video.dto";
import { VideoService } from "./video.service";
import { v4 as uuidv4 } from "uuid";
import { getMeta, setMeta } from "../utils/redisClient";

export class VideoController {
  constructor(private videoService: VideoService) {}

  uploadVideo = async (req: Request, res: Response) => {
    let metaData: UploadVideoDto = req.body;
    let file: Express.Multer.File | undefined = req.file;
    if (!file) {
      throw new InputError(undefined, undefined, {
        message: "File is required",
      });
    }

    const videoData = {
      id: uuidv4(),
      ...metaData,
      videoUrl: file.path,
      uploadDate: new Date().toISOString(),
      size: file.size,
    };

    const exist = await getMeta(videoData.id);

    if (exist) {
      throw new AlreadyExistsError();
    }

    await this.videoService.uploadVideo(videoData);
    res.status(201).json(videoData);
  };

  getVideo = async (req: Request, res: Response) => {
    const videoId = req.query.id as string;

    const video = await this.videoService.getVideo(videoId);
    if (!video) {
      throw new InputError(undefined, undefined, {
        message: "Video not found",
      });
    }
    res.status(200).json(video);
  };

  deleteVideo = async (req: Request, res: Response) => {
    const videoId = req.params.id as string;

    const video = await this.videoService.deleteVideo(videoId);

    res.status(200).json(video);
  };

  getVideos = async (req: Request, res: Response) => {
    const videoData: ListVideoDto = req.query;
    const videos = await this.videoService.getVideos(videoData);
    res.status(200).json(videos);
  };
}
