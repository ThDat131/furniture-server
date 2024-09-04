import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IImage } from '../common/interfaces/image.interface';

@Schema({ timestamps: true })
export class Banner {
    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ unique: true, required: true, type: Object })
    image: IImage;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
