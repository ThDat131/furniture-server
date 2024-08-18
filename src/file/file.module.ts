import { Module } from '@nestjs/common';
import { CloudinaryProvider } from 'src/provider/cloudinary.provider';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
    providers: [CloudinaryProvider, FileService],
    exports: [CloudinaryProvider, FileService],
    controllers: [FileController],
})
export class FileModule {}
