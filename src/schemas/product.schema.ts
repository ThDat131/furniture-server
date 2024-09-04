import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from './category.schema';
import { IImage } from 'src/common/interfaces/image.interface';

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    images: IImage[];

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    stock: number;

    @Prop({ required: false })
    isNew: boolean;

    @Prop({ required: false })
    isPotential: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    categoryId: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
