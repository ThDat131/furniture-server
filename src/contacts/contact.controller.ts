import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactService } from './contact.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/custom-decorator/customize';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
    constructor(private contactService: ContactService) {}

    @Post()
    @Public()
    @UsePipes(new ValidationPipe())
    createContact(@Body() contact: CreateContactDto) {
        return this.contactService.createContact(contact);
    }

    @Get()
    getContact(@Query('email') email?: string) {
        return this.contactService.getContact(email);
    }

    @Delete(':id')
    removeProduct(@Param('id') id: string) {
        return this.contactService.removeContact(id);
    }

    @Put(':id')
    updateContact(@Param('id') id: string, @Body() data: CreateContactDto) {
        return this.contactService.updateContact(id, data);
    }
}
