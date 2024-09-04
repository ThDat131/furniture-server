import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from '../schemas/contact.schema';

@Injectable()
export class ContactService {
    constructor(
        @InjectModel(Contact.name) private contactModel: Model<Contact>,
    ) {}

    createContact(data: CreateContactDto) {
        const newContact = new this.contactModel(data);

        return newContact.save();
    }

    getContact(email: string) {
        let filter = {};

        if (email) {
            filter = {
                email,
            };
        }

        return this.contactModel.find(filter).sort({ isResolved: 1 });
    }

    removeContact(id: string) {
        return this.contactModel.findByIdAndDelete(id);
    }

    updateContact(id: string, data: Partial<CreateContactDto>) {
        return this.contactModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }
}
