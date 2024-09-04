import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerService } from './banner.service';
import { Banner, BannerSchema } from '../schemas/banner.schema';
import { BannerController } from './banner.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Banner.name, schema: BannerSchema },
        ]),
    ],
    controllers: [BannerController],
    providers: [BannerService],
    exports: [],
})
export class BannerModule {}
