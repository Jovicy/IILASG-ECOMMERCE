import { Exclude } from 'class-transformer';
import { Role } from 'generated/prisma';

export class UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  verified: boolean;
  LGA?: string | null;
  isLagosian?: boolean;
  phoneNumber?: string | null;
  createdAt: Date;
  updatedAt: Date;
  password: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
