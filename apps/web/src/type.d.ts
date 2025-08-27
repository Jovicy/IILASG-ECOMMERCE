export interface CredentialsPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isLagosian?: boolean;
  LGA?: string;
  accountType?: string;
  role: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface UserResponsePayload {
  accessToken: string;
  refreshToken: string;
}

export type PartialCredentialsPayload = Partial<Credentials>;
