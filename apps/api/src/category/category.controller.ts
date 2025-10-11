import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'generated/prisma';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
@Roles(Role.VENDOR)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create new product category' })
  @ApiResponse({ status: 201, description: 'Category successfully created' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Request() req: { user: { userId: string } },
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.create(
      createCategoryDto,
      req.user.userId,
      file,
    );
  }

  @ApiOperation({ summary: "Get all vendor's categories" })
  @ApiResponse({ status: 200, description: 'List of categories returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  getAllCategory(@Request() req: { user: { userId: string } }) {
    return this.categoryService.findAll(req.user.userId);
  }

  @ApiOperation({ summary: 'Update a single category by ID' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  updateCategory(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(req.user.userId, id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Get a single category by ID' })
  @ApiResponse({ status: 200, description: 'Category found and returned' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(':id')
  getCategory(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.categoryService.findOne(req.user.userId, id);
  }

  @ApiOperation({ summary: 'Delete a single category by ID' })
  @ApiResponse({ status: 200, description: 'Category deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  deleteCategory(
    @Request() req: { user: { userId: string } },
    @Param('id') id: string,
  ) {
    return this.categoryService.remove(req.user.userId, id);
  }
}
