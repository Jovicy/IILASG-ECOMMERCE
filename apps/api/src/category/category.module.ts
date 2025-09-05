import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { VendorService } from 'src/vendor/vendor.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, VendorService],
})
export class CategoryModule {}
