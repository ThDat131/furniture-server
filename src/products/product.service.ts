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

    getProducts(isNew?: boolean, isPotential?: boolean, categoty?: string) {
        let filter = {};
        if (isNew.toString() === 'true') {
            filter = {
                isNew: true,
                ...filter,
            };
        }
        if (isPotential.toString() === 'true') {
            filter = {
                isPotential: true,
                ...filter,
            };
        }
        if (categoty) {
            filter = {
                categotyId: categoty,
                ...filter,
            };
        }

        return this.productModel.find(filter).populate(['categoryId']);
    }

    getProduct(id: string) {
        return this.productModel.findById(id);
    }

    async removeProduct(id: string) {
        const product = await this.productModel.findById(id).exec();

        product.images.map((x) => {
            this.fileService.removeFile(x.id);
        });

        return this.productModel.findByIdAndDelete(id);
    }

    updateProduct(id: string, data: Partial<CreateProductDto>) {
        return this.productModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }
}
