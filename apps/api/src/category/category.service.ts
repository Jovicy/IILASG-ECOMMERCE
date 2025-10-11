import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { VendorService } from 'src/vendor/vendor.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vendorService: VendorService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    userId: string,
    file: Express.Multer.File,
  ) {
    let imageUrl: string | null = null;
    let publicId: string | null = null;

    if (file) {
      const uploadResult: any = await this.cloudinary.uploadImage(file);
      imageUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    const vendorProfileId =
      await this.vendorService.getVendorProfileIdByUser(userId);

    try {
      return await this.prisma.category.create({
        data: {
          vendorProfileId: vendorProfileId,
          name: createCategoryDto.name.toLowerCase(),
          description: createCategoryDto.description,
          imageUrl: imageUrl,
          imagePublicId: publicId,
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
    const vendorProfileId =
      await this.vendorService.getVendorProfileIdByUser(userId);

    return this.prisma.category.findMany({
      where: { vendorProfileId: vendorProfileId },
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
