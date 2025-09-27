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
  authProvider: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
