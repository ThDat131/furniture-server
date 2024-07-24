import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './categories/category.module';
import { ProductModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/furniture-db'),
        UsersModule,
        CategoryModule,
        ProductModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
