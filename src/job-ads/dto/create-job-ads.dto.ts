import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IImage } from 'src/common/interfaces/image.interface';

export class CreateJobAdsDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    position: string;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @IsNotEmpty()
    startDate: Date;

    @IsNotEmpty()
    endDate: Date;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    positionInformation: string;

    @IsNotEmpty()
    @IsString()
    jobDescription: string;

    @IsNotEmpty()
    @IsString()
    requirement: string;

    @IsNotEmpty()
    @IsString()
    salaryInformation: string;

    @IsNotEmpty()
    image: IImage;
}
