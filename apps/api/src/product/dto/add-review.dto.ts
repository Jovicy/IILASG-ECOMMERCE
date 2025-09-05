import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class AddReviewDto {
  @ApiProperty({ example: 4, required: true })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Nice product', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
}
