import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name) private categoryModel: Model<Category>,
    ) {}

    createCategory(createCategory: CreateCategoryDto) {
        const newCategory = new this.categoryModel(createCategory);

        return newCategory.save();
    }

    getCategories() {
        return this.categoryModel.find();
    }

    removeCategory(id: string) {
        return this.categoryModel.findByIdAndDelete(id);
    }

    updateCategory(id: string, data: Partial<Category>) {
        return this.categoryModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }
}
