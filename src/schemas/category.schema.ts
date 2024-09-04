import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IImage } from 'src/common/interfaces/image.interface';

@Schema({ timestamps: true })
export class Category {
    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ required: true, type: Object })
    image: IImage;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
