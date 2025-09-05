import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, StockStatus } from 'generated/prisma';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { VendorService } from 'src/vendor/vendor.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { AddReviewDto } from './dto/add-review.dto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vendorService: VendorService,
    private readonly categoryService: CategoryService,
  ) {}

  private determineStockStatus(quantity: number): StockStatus {
    if (quantity === 0) return 'OUT_OF_STOCK';
    if (quantity < 5) return 'LIMITED';
    return 'AVAILABLE';
  }

  async createProduct(userId: string, createProductDto: CreateProductDto) {
    const vendorProfileId =
      await this.vendorService.getVendorProfileIdByUser(userId);
    if (!vendorProfileId)
      throw new ForbiddenException('Only vendors can create products');

    if (createProductDto.categoryId) {
      await this.categoryService.findOne(userId, createProductDto.categoryId);
    }

    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        vendorProfileId,
        categoryId: createProductDto.categoryId,
        quantity: createProductDto.quantity,
        stockStatus: this.determineStockStatus(createProductDto.quantity),
        images: {
          create: createProductDto.images?.map((url) => ({ url })) || [],
        },
        features: {
          create: createProductDto.features?.map((name) => ({ name })) || [],
        },
      },
      include: { images: true, features: true, category: true },
    });
  }

  async getVendorProducts(
    userId: string,
    search?: string,
    status?: 'AVAILABLE' | 'LIMITED' | 'OUT_OF_STOCK',
    page = 1,
    limit = 10,
  ) {
    const vendorProfileId =
      await this.vendorService.getVendorProfileIdByUser(userId);

    const where: any = { vendorProfileId };
    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }
    if (status) where.stockStatus = status;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async getAllProducts(
    userId: string,
    search?: string,
    sortBy?: 'sold' | 'new' | 'price_asc' | 'price_desc' | 'rating',
    page = 1,
    limit = 10,
  ) {
    const where: any = {};
    if (search) {
      where.OR = [{ name: { contains: search, mode: 'insensitive' } }];
    }

    let orderBy: any = {};
    switch (sortBy) {
      case 'sold':
        orderBy = { numberSold: 'desc' };
        break;
      case 'new':
        orderBy = { createdAt: 'desc' };
        break;
      case 'price_asc':
        orderBy = { price: 'asc' };
        break;
      case 'price_desc':
        orderBy = { price: 'desc' };
        break;
      case 'rating':
        orderBy = { averageRating: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
        include: {
          images: true,
          savedBy: userId ? { where: { userId }, select: { id: true } } : false,
          reviews: true,
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    const result = data.map((product) => ({
      ...product,
      isSaved: userId ? product.savedBy.length > 0 : false,
      averageRating:
        product.reviews.length > 0
          ? product.reviews.reduce((a, r) => a + r.rating, 0) /
            product.reviews.length
          : null,
    }));

    return {
      data: result,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async getProductById(productId: string, userId: string) {
    const vendorProfileId = await this.prisma.vendorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        vendorProfile: true,
        category: true,
        images: true,
        features: true,
        reviews: { select: { rating: true } },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const averageRating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
          product.reviews.length
        : 0;

    if (vendorProfileId) {
      if (product.vendorProfileId) {
        throw new ForbiddenException('You can only view your own products');
      }
      const { reviews, ...rest } = product;
      return {
        ...rest,
        averageRating,
      };
    }

    const saved = await this.prisma.savedItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    const { reviews, ...rest } = product;
    return {
      ...rest,
      averageRating,
      isSaved: !!saved,
    };
  }

  async updateProduct(
    userId: string,
    productId: string,
    updateProductDto: UpdateProductDto,
  ) {
    const vendorProfileId =
      await this.vendorService.getVendorProfileIdByUser(userId);
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('Product not found');
    if (product.vendorProfileId !== vendorProfileId)
      throw new ForbiddenException('You can only update your own products');

    return this.prisma.product.update({
      where: { id: productId },
      data: {
        ...updateProductDto,
        stockStatus:
          updateProductDto.quantity !== undefined
            ? this.determineStockStatus(updateProductDto.quantity)
            : undefined,
        images: updateProductDto.images
          ? {
              deleteMany: {},
              create: updateProductDto.images.map((url) => ({ url })),
            }
          : undefined,
        features: updateProductDto.features
          ? {
              deleteMany: {},
              create: updateProductDto.features.map((name) => ({ name })),
            }
          : undefined,
      },
      include: { images: true, features: true, category: true },
    });
  }

  async deleteProduct(userId: string, productId: string) {
    const vendorProfileId =
      await this.vendorService.getVendorProfileIdByUser(userId);
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new NotFoundException('Product not found');
    if (product.vendorProfileId !== vendorProfileId)
      throw new ForbiddenException('You can only delete your own products');

    return this.prisma.product.delete({ where: { id: productId } });
  }

  async addReview(userId: string, productId: string, reviewDto: AddReviewDto) {
    return this.prisma.productReview.create({
      data: {
        productId,
        userId,
        rating: reviewDto.rating,
        comment: reviewDto.comment,
      },
    });
  }

  async saveProduct(userId: string, productId: string, isVendor: boolean) {
    if (isVendor) {
      throw new ForbiddenException('Vendors cannot save products');
    }

    return this.prisma.savedItem.create({
      data: { productId, userId },
    });
  }
}
