import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { IImage } from 'src/common/interfaces/image.interface';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsArray()
    images: [IImage, IImage, IImage];

    @IsNotEmpty()
    @IsNumber()
    stock: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsString()
    categoryId: string;

    @IsNotEmpty()
    isNew: boolean;

    @IsNotEmpty()
    isPotential: boolean;

    @IsNotEmpty()
    @IsString()
    overview: string;

    @IsNotEmpty()
    @IsString()
    introduction: string;

    @IsNotEmpty()
    @IsString()
    descriptionTitle: string;

    @IsString()
    subDescription: string;

    @IsNotEmpty()
    @IsString()
    design: string;

    @IsNotEmpty()
    @IsString()
    characteristic: string;

    @IsNotEmpty()
    @IsString()
    specifications: string;

    @IsOptional()
    @IsArray()
    specificationImages: [IImage, IImage];

    @IsOptional()
    @IsArray()
    certificateImages: [IImage, IImage, IImage];

    catalogImage: IImage;
}
