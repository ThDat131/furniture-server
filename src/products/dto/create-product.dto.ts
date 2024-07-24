import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsArray()
    images: string[];

    @IsNotEmpty()
    @IsString()
    categoryId: string;
}
