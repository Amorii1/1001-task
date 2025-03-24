import { IsString, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { PaginationInput } from "../utils/paginationValidator.dto";

export class UploadVideoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export interface VideoData {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  uploadDate: string;
  size: number;
}

export class ListVideoDto extends PaginationInput {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  date?: string;
}

export class FindVideoDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
