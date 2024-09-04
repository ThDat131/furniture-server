import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBannerDto } from './dto/create-banner.dto';
import { Banner } from '../schemas/banner.schema';

@Injectable()
export class BannerService {
    constructor(@InjectModel(Banner.name) private bannerModel: Model<Banner>) {}

    createBanner(data: CreateBannerDto) {
        const newBanner = new this.bannerModel(data);

        return newBanner.save();
    }

    getBanners(name: string) {
        let filter = {};

        if (name) {
            filter = {
                name,
            };
        }

        return this.bannerModel.find(filter);
    }

    removeBanner(id: string) {
        return this.bannerModel.findByIdAndDelete(id);
    }

    updateBanner(id: string, data: Partial<CreateBannerDto>) {
        return this.bannerModel.findByIdAndUpdate(id, data, {
            new: true,
        });
    }
}
