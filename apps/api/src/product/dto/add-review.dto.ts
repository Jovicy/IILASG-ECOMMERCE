import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class AddReviewDto {
  @IsInt()
  @Min(1)
  rating: number; // 1–5

  @IsOptional()
  @IsString()
  comment?: string;
}
