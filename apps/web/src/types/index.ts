export type UserRole = "buyer" | "vendor";

export enum ProductStatus {
  ACTIVE = "ACTIVE",
  UNDER_REVIEW = "UNDER_REVIEW",
  INACTIVE = "INACTIVE",
  REJECTED = "REJECTED",
}

export interface CredentialsPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isLagosian?: boolean;
  phoneNumber?: string;
  LGA?: string;
  accountType?: UserRole;
  role: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface GoogleSignPayload {
  token: string;
  role?: UserRole;
}

export interface GoogleResponsePayload extends UserResponsePayload {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UserResponsePayload {
  role?: string;
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  gender: string;
  verified: boolean;
  phoneNumber: string;
  dateOfBirth: string;
  isLagosian: boolean;
  LGA: string | null;
  createdAt: string;
  updatedAt: string;
}

export type PartialCredentialsPayload = Partial<CredentialsPayload>;
