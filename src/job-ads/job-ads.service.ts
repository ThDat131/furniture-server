import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobAds } from '../schemas/job-ads.schema';
import { CreateJobAdsDto } from './dto/create-job-ads.dto';

@Injectable()
export class JobAdsService {
    constructor(@InjectModel(JobAds.name) private jobAdsModel: Model<JobAds>) {}

    createJobAds(data: CreateJobAdsDto) {
        const newJobAds = new this.jobAdsModel(data);

        return newJobAds.save();
    }

    getJobAds() {
        return this.jobAdsModel.find();
    }

    getJobAdsById(id: string) {
        return this.jobAdsModel.findById(id);
    }

    removeJobAds(id: string) {
        return this.jobAdsModel.findByIdAndDelete(id);
    }

    updateJobAds(id: string, data: Partial<JobAds>) {
        return this.jobAdsModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }
}
