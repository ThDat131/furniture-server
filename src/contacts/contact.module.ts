import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactService } from './contact.service';
import { Contact, ContactSchema } from '../schemas/contact.schema';
import { ContactController } from './contact.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Contact.name, schema: ContactSchema },
        ]),
    ],
    controllers: [ContactController],
    providers: [ContactService],
    exports: [],
})
export class ContactModule {}
