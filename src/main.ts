import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
    const config = new DocumentBuilder()
        .setTitle('Furniture API')
        .setDescription('The Furniture API description')
        .setVersion('1.0')
        .build();
    const app = await NestFactory.create(AppModule);

    // Init data
    const seeder = app.get(SeederService);
    await seeder.seed();

    const reflector = app.get(Reflector);

    app.useGlobalGuards(new JwtAuthGuard(reflector));
    app.setGlobalPrefix('api');
    app.enableCors({
        origin: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        credentials: true,
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Set-Cookie',
            'Cookie',
            'x-no-retry',
        ],
    });
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter());

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger', app, document);

    await app.listen(4000);
}
bootstrap();
