import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { UpdateAddressDto } from 'src/common/dto/update-address.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    schema: {
      example: {
        user: {
          id: 'uuid',
          email: 'user@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'BUYER',
          isLagosian: true,
          LGA: 'Victoria Island',
          createdAt: '2024-06-10T12:00:00.000Z',
          updatedAt: '2024-06-10T12:00:00.000Z',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('')
  async getProfile(
    @Request() req: { user: { userId: string } },
  ): Promise<UserResponseDto | null> {
    const user = await this.userService.findById(req.user.userId);
    return user;
  }

  @Patch('')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  async updateProfile(
    @Request() req: { user: { userId: string } },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(req.user.userId, updateUserDto);
  }

  @Put(':id/address')
  async updateAddress(
    @Param('id') userId: string,
    @Body() updateAddress: UpdateAddressDto,
    @Request() req: { user: { userId: string } },
  ) {
    if (req.user.userId !== userId) {
      throw new Error('You are not allowed to update another user’s address');
    }

    return this.userService.updateAddress(userId, updateAddress);
  }

  @Delete('')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete current user account' })
  @ApiResponse({
    status: 200,
    description: 'User account deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteUser(@Request() req: { user: { userId: string } }) {
    await this.userService.deleteUser(req.user.userId);
    return { message: 'User account deleted successfully' };
  }
}
