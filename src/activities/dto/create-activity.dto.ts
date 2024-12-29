import { IsNotEmpty, IsString } from 'class-validator';
import { IImage } from '../../common/interfaces/image.interface';

export class CreateActivityDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    images: [IImage];
}
