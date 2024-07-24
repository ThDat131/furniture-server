import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from './category.schema';

@Schema()
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    images: string[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    categoryId: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
