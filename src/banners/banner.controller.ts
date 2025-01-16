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
import { CreateBannerDto } from './dto/create-banner.dto';
import { BannerService } from './banner.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/custom-decorator/customize';

@ApiTags('Banners')
@Controller('banners')
export class BannerController {
    constructor(private bannerService: BannerService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createProduct(@Body() banner: CreateBannerDto) {
        return this.bannerService.createBanner(banner);
    }

    @Get()
    @Public()
    getProducts(@Query('name') name?: string) {
        return this.bannerService.getBanners(name);
    }

    @Delete(':id')
    removeProduct(@Param('id') id: string) {
        return this.bannerService.removeBanner(id);
    }

    @Put(':id')
    updateProduct(@Param('id') id: string, @Body() data: CreateBannerDto) {
        return this.bannerService.updateBanner(id, data);
    }
}
