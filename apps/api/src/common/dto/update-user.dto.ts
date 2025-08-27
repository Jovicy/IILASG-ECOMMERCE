import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    example: 'True',
    description: 'Is user a Lagosian',
  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true' || value === true || value === 1) return true;
    if (value === 'false' || value === false || value === 0) return false;
    return value;
  })
  isLagosian?: boolean;

  @ApiPropertyOptional({
    example: 'Victoria Island',
    description: 'LGA name, required if user is a Lagosian',
  })
  @IsOptional()
  @IsString()
  LGA?: string;
}
