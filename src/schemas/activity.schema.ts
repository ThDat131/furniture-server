import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IImage } from '../common/interfaces/image.interface';

@Schema({ timestamps: true })
export class Activity {
    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true, type: Array })
    images: [IImage];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
