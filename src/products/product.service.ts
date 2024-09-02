import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}

    createProduct(product: CreateProductDto) {
        const newProduct = new this.productModel(product);

        return newProduct.save();
    }

    getProducts() {
        return this.productModel.find().populate(['categoryId']);
    }

    getProduct(id: string) {
        return this.productModel.findById(id);
    }

    removeProduct(id: string) {
        return this.productModel.findByIdAndDelete(id);
    }

    updateProduct(id: string, data: Partial<CreateProductDto>) {
        return this.productModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }
}
