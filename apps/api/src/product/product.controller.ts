import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'generated/prisma';
import { AddReviewDto } from './dto/add-review.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RestockProductDto } from './dto/restock-product';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.VENDOR)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @Post()
  @UseInterceptors(FilesInterceptor('images'))
  async createProduct(
    @Request() req: { user: { userId: string } },
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const product = await this.productService.createProduct(
      req.user.userId,
      createProductDto,
      images,
    );

    return {
      status: 'success',
      message: 'Product created successfully',
      data: product,
    };
  }

  @Roles(Role.VENDOR)
  @ApiOperation({ summary: 'My Products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  @Get('my-products')
  getAllMyProducts(
    @Request() req: { user: { userId: string } },
    @Query('search') search?: string,
    @Query('status') status?: 'AVAILABLE' | 'LIMITED' | 'OUT_OF_STOCK',
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productService.getVendorProducts(
      req.user.userId,
      search,
      status,
      +page,
      +limit,
    );
  }

  @Roles(Role.VENDOR)
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('images'))
  async updateProduct(
    @Request() req: { user: { userId: string } },
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    const updatedProduct = await this.productService.updateProduct(
      req.user.userId,
      productId,
      updateProductDto,
      images,
    );

    return {
      status: 'success',
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  @Roles(Role.VENDOR)
  @ApiOperation({ summary: 'Restok a product' })
  @ApiResponse({
    status: 200,
    description: 'Successfully restocked <restockQuantity> units',
  })
  @Post('restock/:productId')
  async restockProduct(
    @Request() req: { user: { userId: string } },
    @Param('productId') productId: string,
    @Body() restockDto: RestockProductDto,
  ) {
    return this.productService.restockProduct(
      req.user.userId,
      productId,
      restockDto.quantity,
    );
  }

  @Roles(Role.VENDOR)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @Delete(':id')
  deleteProduct(
    @Request() req: { user: { userId: string } },
    @Param('id') productId: string,
  ) {
    return this.productService.deleteProduct(req.user.userId, productId);
  }

  @Roles(Role.BUYER)
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products' })
  @Get()
  getAllProducts(
    @Request() req: { user: { userId: string } },
    @Query('search') search?: string,
    @Query('sortBy')
    sortBy?: 'sold' | 'new' | 'price_asc' | 'price_desc' | 'rating',
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productService.getAllProducts(
      req.user.userId,
      search,
      sortBy,
      +page,
      +limit,
    );
  }

  @Post(':productId/reviews')
  @ApiOperation({ summary: 'Add a review to a product' })
  @ApiResponse({ status: 201, description: 'Review created successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async addReview(
    @Param('productId') productId: string,
    @Body() reviewDto: AddReviewDto,
    @Request() req: { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.productService.addReview(userId, productId, reviewDto);
  }

  @Roles(Role.BUYER)
  @Post(':productId/save')
  @ApiOperation({ summary: 'Save a product to user’s saved list' })
  @ApiResponse({ status: 201, description: 'Product saved successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async saveProduct(
    @Param('productId') productId: string,
    @Request() req: { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.productService.saveProduct(userId, productId);
  }

  @Roles(Role.BUYER)
  @Delete(':productId/unsave')
  @ApiOperation({ summary: 'Remove a product from user’s saved list' })
  @ApiResponse({ status: 200, description: 'Product unsaved successfully' })
  @ApiResponse({ status: 404, description: 'Product not saved' })
  async unsaveProduct(
    @Param('productId') productId: string,
    @Request() req: { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    return this.productService.unsaveProduct(userId, productId);
  }

  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @Get(':id')
  getProduct(
    @Request() req: { user: { userId: string } },
    @Param('id') productId: string,
  ) {
    return this.productService.getProductById(productId, req.user.userId);
  }
}
