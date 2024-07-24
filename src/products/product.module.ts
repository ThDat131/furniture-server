import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemas/product.schema';
import { ProductService } from './product.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
        ]),
    ],
    controllers: [ProductsController],
    providers: [ProductService],
    exports: [],
})
export class ProductModule {}
