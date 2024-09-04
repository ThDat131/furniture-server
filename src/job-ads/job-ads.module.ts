import { Module } from '@nestjs/common';
import { JobAdsController } from './job-ads.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobAds, JobAdsSchema } from '../schemas/job-ads.schema';
import { JobAdsService } from './job-ads.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: JobAds.name, schema: JobAdsSchema },
        ]),
    ],
    controllers: [JobAdsController],
    providers: [JobAdsService],
    exports: [],
})
export class JobAdsModule {}
