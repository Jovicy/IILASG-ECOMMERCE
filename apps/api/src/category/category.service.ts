import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto, userId: string) {
    const vendorProfile = await this.prisma.vendorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!vendorProfile) {
      throw new NotFoundException(
        `Vendor profile not found for userId ${userId}`,
      );
    }

    try {
      return await this.prisma.category.create({
        data: {
          vendorProfileId: vendorProfile.id,
          name: createCategoryDto.name.toLowerCase(),
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Category ${createCategoryDto.name} already exists for this vendor`,
        );
      }
      throw error;
    }
  }

  async findAll(userId: string) {
    const vendorProfile = await this.prisma.vendorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!vendorProfile) {
      throw new NotFoundException(
        `Vendor profile not found for userId ${userId}`,
      );
    }

    return this.prisma.category.findMany({
      where: { vendorProfileId: vendorProfile.id },
    });
  }

  async findOne(userId: string, id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { vendorProfile: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (category.vendorProfile.userId !== userId) {
      throw new ForbiddenException('You do not own this category');
    }

    return category;
  }

  async update(
    userId: string,
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { vendorProfile: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (category.vendorProfile.userId !== userId) {
      throw new ForbiddenException('You do not own this category');
    }

    try {
      return await this.prisma.category.update({
        where: { id },
        data: { name: updateCategoryDto.name ?? category.name },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Category "${updateCategoryDto.name}" already exists for this vendor`,
        );
      }
      throw error;
    }
  }

  async remove(userId: string, id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { vendorProfile: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (category.vendorProfile.userId !== userId) {
      throw new ForbiddenException('You do not own this category');
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
