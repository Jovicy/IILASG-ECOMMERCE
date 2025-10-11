import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
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
  @Type(() => Number)
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 1999.99, description: 'Price of the product' })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ example: '10%', description: 'Discount % of the product' })
  @Type(() => Number)
  @IsNumber()
  discount: number;

  @ApiProperty({
    example: 'uuid-of-category',
    description: 'Category ID for this product',
  })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiProperty({
    example: ['Lightweight', 'Retina display'],
    description: 'Product features',
    required: false,
    isArray: true,
  })
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? JSON.parse(value) : value,
  )
  @IsArray()
  features?: string[];
}
