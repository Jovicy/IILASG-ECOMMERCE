export type UserRole = "buyer" | "vendor";

export interface CredentialsPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isLagosian?: boolean;
  LGA?: string;
  accountType?: UserRole;
  role: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface UserResponsePayload {
  role?: string;
  accessToken: string;
  refreshToken: string;
}

export type PartialCredentialsPayload = Partial<CredentialsPayload>;
