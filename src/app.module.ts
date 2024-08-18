import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CategoryModule } from './categories/category.module';
import { ProductModule } from './products/product.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING),
        UsersModule,
        CategoryModule,
        ProductModule,
        AuthModule,
        FileModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
