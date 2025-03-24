import { IsOptional } from "class-validator";

export class PaginationInput {
  @IsOptional()
  skip?: number;
  @IsOptional()
  take?: number;
  @IsOptional()
  page?: number;
  @IsOptional()
  perPage?: number;
}
