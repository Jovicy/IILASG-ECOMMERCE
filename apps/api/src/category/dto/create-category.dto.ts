import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty({
    example: 'Category for electronic products',
    description: 'A brief description of the category',
  })
  description: string;
}
