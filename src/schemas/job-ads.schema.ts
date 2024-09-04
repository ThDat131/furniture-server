import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IImage } from 'src/common/interfaces/image.interface';

@Schema({ timestamps: true })
export class JobAds {
    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ required: true })
    position: string;

    @Prop({ required: true })
    quantity: number;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    title: string;

    @Prop()
    positionInformation: string;

    @Prop()
    jobDescription: string;

    @Prop()
    requirement: string;

    @Prop()
    salaryInformation: string;

    @Prop({ required: true, type: Object })
    image: IImage;
}

export const JobAdsSchema = SchemaFactory.createForClass(JobAds);
