import { envData } from "./envData";
import { createClient } from "redis";
import { RedisError } from "./customError";

export const redisClient = createClient();

export const connectRedis = async () => {
  if (!redisClient.isOpen) await redisClient.connect();
};

export const setRedis = async (
  key: string,
  value: string,
  expireTimeInMinutes?: number
) => {
  try {
    await redisClient.set(
      key,
      value,
      expireTimeInMinutes
        ? { EX: expireTimeInMinutes * 60 }
        : { EX: envData.REDIS_EXPIRE_IN * 60 }
    );
  } catch (error) {
    throw new RedisError();
  }
};

export const getRedis = async (key: string) => {
  try {
    const value = await redisClient.get(key);
    return value;
  } catch (error) {
    throw new RedisError();
  }
};

//for Videos
export const setMeta = async (
  key: string,
  value: any,
  expireTimeInMinutes?: number
) => {
  try {
    const valueToStore =
      typeof value === "object" ? JSON.stringify(value) : value;
    const videoKey = `video:${key}`;

    await redisClient.set(
      videoKey,
      valueToStore,
      expireTimeInMinutes
        ? { EX: expireTimeInMinutes * 60 }
        : { EX: envData.REDIS_EXPIRE_IN * 60 }
    );
  } catch (error) {
    throw new RedisError();
  }
};

//for Videos
export const getMeta = async (key: string) => {
  try {
    const videoKey = `video:${key}`; // Prefix with "video:"
    const value = await redisClient.get(videoKey);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    throw new RedisError();
  }
};

export const removeRedis = async (key: string) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    throw new RedisError();
  }
};

// List all videos with optional filtering by title and/or upload date
export const listMeta = async (
  titleFilter?: string,
  descriptionFilter?: string,
  uploadDateFilter?: string
) => {
  try {
    // Get all video keys in Redis
    const keys = await redisClient.keys("video:*");

    if (keys.length === 0) return []; // No videos in Redis

    // Fetch all video metadata concurrently
    const metadataPromises = keys.map((key) =>
      getMeta(key.replace("video:", ""))
    );
    const metadataList = await Promise.all(metadataPromises);

    // Filter metadata based on the provided filters
    return metadataList.filter((metadata) => {
      if (!metadata) return false; // Skip if no metadata found for this key

      let match = true;

      // Title filter
      if (
        titleFilter &&
        !metadata.title.toLowerCase().includes(titleFilter.toLowerCase())
      ) {
        match = false;
      }

      // Description filter
      if (
        descriptionFilter &&
        !metadata.description
          .toLowerCase()
          .includes(descriptionFilter.toLowerCase())
      ) {
        match = false;
      }

      // Upload date filter
      if (
        uploadDateFilter &&
        !metadata.uploadDate.startsWith(uploadDateFilter)
      ) {
        match = false;
      }

      return match;
    });
  } catch (error) {
    throw new RedisError();
  }
};
