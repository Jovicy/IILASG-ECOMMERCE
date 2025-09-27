import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsInt,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'MacBook Pro 14"',
    description: 'Name of the product',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Apple laptop with M1 Pro chip', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '60', required: false })
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: 1999.99, description: 'Price of the product' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'uuid-of-category',
    description: 'Category ID for this product',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({
    example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
    description: 'Product images',
    required: false,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiProperty({
    example: ['Lightweight', 'Retina display'],
    description: 'Product features',
    required: false,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  features?: string[];
}
