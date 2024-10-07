import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { SeederService } from './seeder.service';
import { Category, CategorySchema } from 'src/schemas/category.schema';
import { Banner, BannerSchema } from 'src/schemas/banner.schema';
import { Product, ProductSchema } from 'src/schemas/product.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Category.name, schema: CategorySchema },
            { name: Banner.name, schema: BannerSchema },
            { name: Product.name, schema: ProductSchema },
        ]),
        AuthModule,
    ],
    controllers: [],
    providers: [SeederService],
    exports: [SeederService],
})
export class SeederModule {}
