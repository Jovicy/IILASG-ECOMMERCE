import { UserResponseDto } from './user-response.dto';

export class LoginUserDto {
  user: UserResponseDto;
  accessToken?: string;
  refreshTokken?: string;
}
