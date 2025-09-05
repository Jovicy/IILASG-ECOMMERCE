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

@ApiTags('Products')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Roles(Role.VENDOR)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @Post()
  createProduct(
    @Request() req: { user: { userId: string } },
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(req.user.userId, createProductDto);
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
  updateProduct(
    @Request() req: { user: { userId: string } },
    @Param('id') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(
      req.user.userId,
      productId,
      updateProductDto,
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
