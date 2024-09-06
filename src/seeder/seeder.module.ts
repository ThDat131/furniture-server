import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { SeederService } from './seeder.service';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Category.name, schema: CategorySchema },
        ]),
        AuthModule,
    ],
    controllers: [],
    providers: [SeederService],
    exports: [SeederService],
})
export class SeederModule {}
