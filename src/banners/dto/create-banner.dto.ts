import { IsNotEmpty, IsString } from 'class-validator';
import { IImage } from '../../common/interfaces/image.interface';

export class CreateBannerDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    image: IImage;
}
