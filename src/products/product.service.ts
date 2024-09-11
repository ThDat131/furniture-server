import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<Product>,
        private fileService: FileService,
    ) {}

    createProduct(product: CreateProductDto) {
        const newProduct = new this.productModel(product);

        return newProduct.save();
    }

    getProducts(isNew?: boolean, isPotential?: boolean, category?: string) {
        let filter: any = {};

        if (category) {
            filter.categoryId = category;
        }

        if (isNew && isNew.toString() === 'true') {
            filter.isNew = true;
        }

        if (isPotential && isPotential.toString() === 'true') {
            filter.isPotential = true;
        }

        return this.productModel.find(filter).populate(['categoryId']);
    }

    getProduct(id: string) {
        return this.productModel.findById(id);
    }

    getProductByCategoryId(categoryId: string) {
        return this.productModel.find({ categoryId });
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
