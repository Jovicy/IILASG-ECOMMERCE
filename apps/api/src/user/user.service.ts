import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { argon2id, hash } from 'argon2';
import { AuthProvider, Role } from 'generated/prisma';
import { CreateUserDto } from 'src/common/dto/create-user.dto';
import { UpdateAddressDto } from 'src/common/dto/update-address.dto';
import { UpdateUserDto } from 'src/common/dto/update-user.dto';
import { UserResponseDto } from 'src/common/dto/user-response.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createUser: CreateUserDto,
    authProvider: AuthProvider = 'LOCAL',
  ): Promise<UserResponseDto> {
    const { password, role, ...userInfo } = createUser;

    const existingUser = await this.prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await hash(password, {
      type: argon2id,
      memoryCost: 65536,
      timeCost: 3,
      parallelism: 1,
    });

    let user: any;

    if (createUser.role === Role.VENDOR) {
      user = await this.prisma.$transaction(async (prisma) => {
        const newUser = await prisma.user.create({
          data: {
            ...createUser,
            password: hashedPassword,
            authProvider,
            vendorProfile: {
              create: {},
            },
          },
        });
        return newUser;
      });
    } else {
      user = await this.prisma.user.create({
        data: {
          ...createUser,
          password: hashedPassword,
          authProvider,
        },
      });
    }

    return new UserResponseDto(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return new UserResponseDto(user);
  }

  async findById(userId: string): Promise<UserResponseDto | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return null;
    }

    return new UserResponseDto(user);
  }

  async updateUser(
    userId: string,
    updateData: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    if (updateData.password) {
      throw new BadRequestException(
        'Password cannot be updated through this endpoint',
      );
    }

    if (updateData.role) {
      throw new BadRequestException(
        'Role cannot be updated through this endpoint',
      );
    }

    if (
      updateData.isLagosian === true &&
      (!updateData.LGA || updateData.LGA.trim() === '')
    ) {
      throw new BadRequestException('LGA is required for Lagosians');
    }

    if (updateData.isLagosian === false) {
      updateData.LGA = undefined;
    }

    const { password, role, ...safeUpdateData } = updateData;

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: safeUpdateData,
    });

    return new UserResponseDto(updatedUser);
  }

  async updateAddress(userId: string, updateAddress: UpdateAddressDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { address: true },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    let address: any;

    if (user.addressId) {
      address = await this.prisma.address.update({
        where: { id: user.addressId },
        data: {
          state: updateAddress.state,
          LGA: updateAddress.LGA,
          address: updateAddress.address,
        },
      });
    } else {
      address = await this.prisma.address.create({
        data: {
          state: updateAddress.state,
          LGA: updateAddress.LGA,
          address: updateAddress.address,
          user: { connect: { id: userId } },
        },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: {
          addressId: address.id,
          ...(updateAddress.phoneNumber
            ? { phoneNumber: updateAddress.phoneNumber }
            : null),
        },
      });
    }

    return {
      message: 'Address updated successfully',
      address,
      ...(updateAddress.phoneNumber
        ? { phoneNumber: updateAddress.phoneNumber }
        : null),
    };
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
