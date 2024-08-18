import {
    Body,
    Controller,
    HttpCode,
    Post,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/custom-decorator/customize';

@ApiTags('Files')
@Controller('files')
export class FileController {
    constructor(private readonly fileService: FileService) {}

    @Post('upload')
    @Public()
    @UseInterceptors(FilesInterceptor('files', 5))
    uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
        return this.fileService.uploadFile(files);
    }

    @Post('remove')
    @HttpCode(200)
    @Public()
    removeFile(@Body() data: any) {
        return this.fileService.removeFile(data.id);
    }
}
