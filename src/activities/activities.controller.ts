import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Public } from 'src/custom-decorator/customize';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Activities')
@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    @Post()
    create(@Body() createActivityDto: CreateActivityDto) {
        return this.activitiesService.create(createActivityDto);
    }

    @Get()
    @Public()
    findAll() {
        return this.activitiesService.findAll();
    }

    @Get(':id')
    @Public()
    findOne(@Param('id') id: string) {
        return this.activitiesService.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateActivityDto: UpdateActivityDto,
    ) {
        return this.activitiesService.update(id, updateActivityDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activitiesService.remove(id);
    }
}
