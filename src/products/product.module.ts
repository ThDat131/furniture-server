import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductService } from './product.service';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductService],
    exports: [],
})
export class ProductModule {}
