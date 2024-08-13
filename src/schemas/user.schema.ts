import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
