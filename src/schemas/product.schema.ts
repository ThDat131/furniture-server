import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from './category.schema';
import { IImage } from 'src/common/interfaces/image.interface';

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    overview: string;

    @Prop()
    introduction: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    descriptionTitle: string;

    @Prop()
    subDescription: string;

    @Prop({ required: true })
    design: string;

    @Prop({ required: true })
    characteristic: string;

    @Prop()
    specifications: string;

    @Prop({ required: true })
    images: [IImage, IImage, IImage];

    @Prop()
    specificationImages: [IImage, IImage];

    @Prop({ type: Object })
    certificateImages: [IImage, IImage, IImage];

    @Prop({ type: Object })
    catalogImage: IImage;

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
