import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Category } from 'src/schemas/category.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class SeederService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>,
        private authService: AuthService,
    ) {}

    async seed() {
        await this.createUsers();
        await this.createCategories();
    }

    private async createCategories() {
        const categories = [
            {
                _id: '66d83be4cdc651edcb87be30',
                name: 'Đèn bàn',
                image: {
                    url: 'https://denledsct.com/wp-content/uploads/2018/08/RD_RL_26.jpg',
                    id: 'den-ban-id',
                },
            },
            {
                _id: '66d83bef3512bbddbf74403d',
                name: 'Ghế',
                image: {
                    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ddSOlBjHLudnvNiemNzPXHGhrkw7VNLd3g&s',
                    id: 'ghe-id',
                },
            },
            {
                _id: '66d83bf94618e07a034d6e8c',
                name: 'Bàn',
                image: {
                    url: 'https://down-vn.img.susercontent.com/file/41d61f0c28d0fa6660f5d0dc03089159_tn',
                    id: 'ban-id',
                },
            },
        ];

        for (const category of categories) {
            const existedCategory = await this.categoryModel
                .findOne({
                    name: category.name,
                })
                .exec();

            if (!existedCategory) {
                this.categoryModel.create(category);
            }
        }
    }

    private async createUsers() {
        const users = [
            {
                _id: '66d83c0b9ab0bd236a147206',
                username: 'admin',
                fullName: 'admin',
                password: '123123',
                role: 'ADMIN',
            },
        ];

        for (const user of users) {
            const existingUser = await this.userModel
                .findOne({ username: user.username })
                .exec();

            if (!existingUser) {
                const hashPassword = this.authService.hashPassword(
                    user.password,
                );
                user.password = hashPassword;

                this.userModel.create(user);
            }
        }
    }
}
