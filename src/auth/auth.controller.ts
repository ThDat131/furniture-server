import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/custom-decorator/customize';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-in')
    @Public()
    async signIn(@Body() auth: AuthPayloadDto) {
        const user = await this.authService.validateUser(auth);

        return user;
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        console.log(req.user);
    }
}
