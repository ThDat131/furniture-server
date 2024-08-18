import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import streamifier from 'streamifier';
import { CloudinaryResponse } from './dto/cloudinary.response';

@Injectable()
export class FileService {
    uploadFile(files: Express.Multer.File[]): Promise<CloudinaryResponse[]> {
        const options: UploadApiOptions = {
            access_mode: 'public',
            folder: 'furniture/images',
            resource_type: 'image',
        };

        console.log(files);

        return new Promise((resolve, reject) => {
            const uploadPromises = files.map(
                (file) =>
                    new Promise<CloudinaryResponse>((resolve, reject) => {
                        const uploadStream = cloudinary.uploader.upload_stream(
                            options,
                            (error, result) => {
                                if (error) {
                                    return reject(error);
                                }
                                resolve(result);
                            },
                        );

                        streamifier
                            .createReadStream(file.buffer)
                            .pipe(uploadStream);
                    }),
            );

            Promise.all(uploadPromises)
                .then((results) => resolve(results))
                .catch((error) => reject(error));
        });
    }

    removeFile(id: string): Promise<CloudinaryResponse[]> {
        return cloudinary.uploader.destroy(id);
    }
}
