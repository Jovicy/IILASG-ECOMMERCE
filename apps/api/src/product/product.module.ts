import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { VendorService } from 'src/vendor/vendor.service';
import { CategoryService } from 'src/category/category.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    VendorService,
    CategoryService,
    CloudinaryService,
  ],
})
export class ProductModule {}
