import { ListVideoDto, VideoData } from "./video.dto";
import { getMeta, listMeta, removeRedis, setMeta } from "../utils/redisClient";

export class VideoService {
  constructor() {}

  async uploadVideo(videoData: VideoData) {
    await setMeta(videoData.id, videoData);
    return;
  }

  async getVideos(data: ListVideoDto) {
    const { skip, take, title, description, date } = data;
    const videos = await listMeta(title, description, date);
    //redis pagination
    if (skip != undefined && take != undefined)
      return videos.slice(skip, skip + take);
    return videos;
  }

  async getVideo(id: string) {
    const video = await getMeta(id);
    return video;
  }

  async deleteVideo(id: string) {
    const video = await removeRedis(id);
    return video;
  }
}
