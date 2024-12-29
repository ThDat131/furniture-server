import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Model } from 'mongoose';
import { Activity } from 'src/schemas/activity.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ActivitiesService {
    constructor(
        @InjectModel(Activity.name)
        private readonly activityModel: Model<Activity>,
    ) {}
    create(createActivityDto: CreateActivityDto) {
        return this.activityModel.create(createActivityDto);
    }

    findAll() {
        return this.activityModel.find();
    }

    findOne(id: string) {
        return this.activityModel.findById(id);
    }

    update(id: string, updateActivityDto: UpdateActivityDto) {
        return this.activityModel.findByIdAndUpdate(id, updateActivityDto, {
            new: true,
        });
    }

    remove(id: string) {
        return this.activityModel.findByIdAndDelete(id);
    }
}
