import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Gender, Role } from 'generated/prisma';

export class CreateUserDto {
  @ApiProperty({ example: 'testing@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Mike' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '+23490675' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ enum: Role })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  verified?: boolean;

  @ApiProperty({
    enum: Gender,
    example: Gender.MALE,
    description: 'User gender (MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY)',
  })
  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;

  @ApiProperty({
    example: '1995-08-15',
    description: 'Date of birth in ISO format (YYYY-MM-DD)',
  })
  @IsDateString()
  @IsOptional()
  dateOfBirth?: string;
}
