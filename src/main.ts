import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const config = new DocumentBuilder()
        .setTitle('Furniture API')
        .setDescription('The Furniture API description')
        .setVersion('1.0')
        .addTag('furniture')
        .build();
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger', app, document);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(4000);
}
bootstrap();
