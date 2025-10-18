import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class RestockProductDto {
  @Type(() => Number)
  @IsNumber()
  quantity: number;
}
