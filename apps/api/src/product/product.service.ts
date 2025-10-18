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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly vendorService: VendorService,
    private readonly categoryService: CategoryService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  private determineStockStatus(quantity: number): StockStatus {
    if (quantity === 0) return 'OUT_OF_STOCK';
    if (quantity < 5) return 'LIMITED';
    return 'AVAILABLE';
  }

  async createProduct(
    userId: string,
    createProductDto: CreateProductDto,
    images: Express.Multer.File[],
  ) {
    const vendorProfileId =
      await this.vendorService.getVendorProfileIdByUser(userId);
    if (!vendorProfileId)
      throw new ForbiddenException('Only vendors can create products');

    if (createProductDto.categoryId) {
      await this.categoryService.findOne(userId, createProductDto.categoryId);
    }

    const uploadedImages: { url: string; id: string }[] = [];

    if (images && images.length > 0) {
      for (const file of images) {
        const uploadResult: any = await this.cloudinary.uploadImage(file);
        uploadedImages.push({
          url: uploadResult.secure_url,
          id: uploadResult.public_id,
        });
      }
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
        discount: createProductDto.discount,

        features: createProductDto.features,

        images: {
          create: uploadedImages.map((image) => ({
            url: image.url,
          })),
        },
      },
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
        include: {
          images: true,
        },
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
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true,
        images: true,
        reviews: {
          include: {
            user: {
              select: { firstName: true, lastName: true, verified: true },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const reviews = product.reviews ?? [];

    const totalRating = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    const averageRating = reviews.length ? totalRating / reviews.length : 0;

    const saved = await this.prisma.savedItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    const { reviews: _, ...rest } = product;

    return {
      ...rest,
      reviews,
      stats: {
        averageRating,
        totalRating,
        totalReviews: reviews.length,
      },
      isSaved: Boolean(saved),
    };
  }

  async updateProduct(
    userId: string,
    productId: string,
    updateProductDto: UpdateProductDto,
    images: Express.Multer.File[],
  ) {
    const { removedImageIds, ...otherFields } = updateProductDto;

    const vendorProfileId =
      await this.vendorService.getVendorProfileIdByUser(userId);

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (product.vendorProfileId !== vendorProfileId)
      throw new ForbiddenException('You can only update your own products');

    // Delete removed images from Cloudinary
    if (removedImageIds?.length) {
      for (const publicId of removedImageIds) {
        await this.cloudinary.deleteImage(publicId);
      }

      await this.prisma.productImage.deleteMany({
        where: { id: { in: removedImageIds } },
      });
    }

    // Upload new images
    const uploadedImages: { url: string; id: string }[] = [];
    if (images?.length) {
      for (const file of images) {
        const uploadResult: any = await this.cloudinary.uploadImage(file);
        uploadedImages.push({
          url: uploadResult.secure_url,
          id: uploadResult.public_id,
        });
      }
    }

    // Update product
    return this.prisma.product.update({
      where: { id: productId },
      data: {
        ...otherFields,
        stockStatus:
          updateProductDto.quantity !== undefined
            ? this.determineStockStatus(updateProductDto.quantity)
            : undefined,
        features: updateProductDto.features,
        images: {
          create: uploadedImages.map((image) => ({
            url: image.url,
          })),
        },
      },
    });
  }

  async restockProduct(
    userId: string,
    productId: string,
    restockQuantity: number,
  ) {
    const vendorProfileId =
      await this.vendorService.getVendorProfileIdByUser(userId);

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.vendorProfileId !== vendorProfileId) {
      throw new ForbiddenException('You can only restock your own products');
    }

    const newQuantity = (product.quantity || 0) + restockQuantity;

    const updatedProduct = await this.prisma.product.update({
      where: { id: productId },
      data: {
        quantity: newQuantity,
        stockStatus: this.determineStockStatus(newQuantity),
        updatedAt: new Date(),
      },
    });

    return {
      data: updatedProduct,
      message: `Successfully restocked ${restockQuantity} units`,
    };
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
    const isProduct = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        vendorProfile: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!isProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    if (isProduct.vendorProfile.userId === userId) {
      throw new ForbiddenException('You cannot review your own product.');
    }

    return this.prisma.productReview.create({
      data: {
        productId,
        userId,
        rating: reviewDto.rating,
        comment: reviewDto.comment,
      },
    });
  }

  async saveProduct(userId: string, productId: string) {
    const isProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!isProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return this.prisma.savedItem.create({
      data: { productId, userId },
    });
  }

  async unsaveProduct(userId: string, productId: string) {
    const isSaved = await this.prisma.savedItem.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (!isSaved) {
      throw new NotFoundException(`Product with ID ${productId} is not saved`);
    }

    return this.prisma.savedItem.delete({
      where: {
        userId_productId: { userId, productId },
      },
    });
  }
}
