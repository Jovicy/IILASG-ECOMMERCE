import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @ApiProperty({ example: 'Lagos State' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 'Ikeja' })
  @IsString()
  @IsNotEmpty()
  LGA: string;

  @ApiProperty({ example: '12B Allen Avenue, Ikeja' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '+23490675' })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;
}
