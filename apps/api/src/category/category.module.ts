import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { VendorService } from 'src/vendor/vendor.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, VendorService, CloudinaryService],
})
export class CategoryModule {}
