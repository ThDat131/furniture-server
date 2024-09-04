import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductService } from './product.service';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { FileService } from '../file/file.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductService, FileService],
    exports: [],
})
export class ProductModule {}
