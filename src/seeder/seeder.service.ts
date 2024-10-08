import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { Banner } from 'src/schemas/banner.schema';
import { Category } from 'src/schemas/category.schema';
import { Product } from 'src/schemas/product.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class SeederService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Category.name)
        private readonly categoryModel: Model<Category>,
        private readonly authService: AuthService,
        @InjectModel(Banner.name) private readonly bannerModel: Model<Banner>,
        @InjectModel(Product.name)
        private readonly productModel: Model<Product>,
    ) {}

    async seed() {
        await this.createUsers();
        await this.createBanners();
        await this.createCategories();
        await this.createProducts();
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

    private async createBanners() {
        const banners = [
            {
                name: 'homeBannerImg',
                image: {
                    id: 'furniture/images/fmkhxtsnjhq78r4ro2hc',
                    url: 'http://res.cloudinary.com/dgyytgkae/image/upload/v1725887284/furniture/images/fmkhxtsnjhq78r4ro2hc.jpg',
                },
            },
            {
                name: 'recruitmentBannerImg',
                image: {
                    id: 'furniture/images/p75ezsci3bxm2bumg3tx',
                    url: 'http://res.cloudinary.com/dgyytgkae/image/upload/v1725943365/furniture/images/p75ezsci3bxm2bumg3tx.jpg',
                },
            },
            {
                name: 'policyBannerImg',
                image: {
                    id: 'furniture/images/xootrg3o5tuf699gwavp',
                    url: 'http://res.cloudinary.com/dgyytgkae/image/upload/v1725946233/furniture/images/xootrg3o5tuf699gwavp.jpg',
                },
            },
        ];

        for (const banner of banners) {
            const existingBanner = await this.bannerModel.findOne({
                name: banner.name,
            });

            if (!existingBanner) this.bannerModel.create(banner);
        }
    }

    private async createProducts() {
        const products = [
            {
                name: 'Đèn năng lượng',
                description: 'Đèn năng lượng mặt trời',
                images: [
                    {
                        id: 'furniture/images/tucjtguaz1w0ozrxzrhq',
                        url: 'http://res.cloudinary.com/dgyytgkae/image/upload/v1725230156/furniture/images/tucjtguaz1w0ozrxzrhq.jpg',
                    },
                ],
                price: 99998,
                stock: 100,
                categoryId: '66d83be4cdc651edcb87be30',
                isNew: true,
                isPotential: true,
            },
            {
                name: 'Ghế dựa',
                description: 'Ghế đọc sách',
                images: [
                    {
                        id: 'furniture/images/f0mft8j6s4xz1x73qkra',
                        url: 'http://res.cloudinary.com/dgyytgkae/image/upload/v1725623792/furniture/images/f0mft8j6s4xz1x73qkra.jpg',
                    },
                    {
                        id: 'furniture/images/thnygfxya9qjtndhdozb',
                        url: 'http://res.cloudinary.com/dgyytgkae/image/upload/v1725627976/furniture/images/thnygfxya9qjtndhdozb.jpg',
                    },
                ],
                price: 600000,
                stock: 97,
                categoryId: '66d83bef3512bbddbf74403d',
                isNew: false,
                isPotential: true,
            },
            {
                name: 'Bàn làm việc',
                description: 'Kích thước 150x150',
                images: [
                    {
                        id: 'furniture/images/etd2t5cclyufghmqbgrd',
                        url: 'http://res.cloudinary.com/dgyytgkae/image/upload/v1725628112/furniture/images/etd2t5cclyufghmqbgrd.jpg',
                    },
                    {
                        id: 'furniture/images/mb5dpvqofw3ldomkpkji',
                        url: 'http://res.cloudinary.com/dgyytgkae/image/upload/v1725628132/furniture/images/mb5dpvqofw3ldomkpkji.jpg',
                    },
                    {
                        id: 'furniture/images/iy2m9iaitktvbqsku2jn',
                        url: 'http://res.cloudinary.com/dgyytgkae/image/upload/v1725628149/furniture/images/iy2m9iaitktvbqsku2jn.jpg',
                    },
                ],
                price: 1000000,
                stock: 100,
                categoryId: '66d83bf94618e07a034d6e8c',
                isNew: false,
                isPotential: true,
            },
        ];

        for (const product of products) {
            const existingProduct = await this.productModel.findOne({
                name: product.name,
            });

            if (!existingProduct) this.productModel.create(product);
        }
    }
}
