import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreateJobAdsDto } from './dto/create-job-ads.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/custom-decorator/customize';
import { JobAdsService } from './job-ads.service';

@ApiTags('JobAds')
@Controller('job-ads')
export class JobAdsController {
    constructor(private jobAdsService: JobAdsService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    createJobAds(@Body() createJobAdsDto: CreateJobAdsDto) {
        return this.jobAdsService.createJobAds(createJobAdsDto);
    }

    @Get()
    @Public()
    getJobAds() {
        return this.jobAdsService.getJobAds();
    }

    @Get(':id')
    @Public()
    getJobAdsById(@Param('id') id: string) {
        return this.jobAdsService.getJobAdsById(id);
    }

    @Delete(':id')
    removeJobAds(@Param('id') id: string) {
        return this.jobAdsService.removeJobAds(id);
    }

    @Put(':id')
    updateJobAds(@Param('id') id: string, @Body() data: CreateJobAdsDto) {
        return this.jobAdsService.updateJobAds(id, data);
    }
}
