import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { compare, genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async validateUser({ username, password }: AuthPayloadDto) {
        const user = await this.userModel.findOne({ username });

        if (!user) {
            return null;
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            return null;
        }

        const payload = {
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            role: user.role,
        };

        const accessToken = this.jwtService.sign(payload, { expiresIn: '30d' });
        const responseUser = { ...payload, accessToken };

        return responseUser;
    }

    hashPassword = (password: string) => {
        const salt = genSaltSync(10);
        const hash = hashSync(password, salt);
        return hash;
    };
}
