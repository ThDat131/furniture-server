import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Contact {
    @Prop({ unique: true, required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    message: string;

    @Prop({ requied: true })
    isResolved: boolean;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
