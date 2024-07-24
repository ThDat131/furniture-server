import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private authService: AuthService,
    ) {}

    createUser(createUserDto: CreateUserDto) {
        const hashPassword = this.authService.hashPassword(
            createUserDto.password,
        );
        const newUser = new this.userModel({
            fullName: createUserDto.fullName,
            password: hashPassword,
            username: createUserDto.username,
        });

        return newUser.save();
    }

    getUsers() {
        return this.userModel.find();
    }
}
