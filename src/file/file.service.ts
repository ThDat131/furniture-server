import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import streamifier from 'streamifier';
import { CloudinaryResponse } from './dto/cloudinary.response';
import { IImage } from 'src/common/interfaces/image.interface';

@Injectable()
export class FileService {
    uploadFile(files: Express.Multer.File[]): Promise<IImage[]> {
        const options: UploadApiOptions = {
            access_mode: 'public',
            folder: 'furniture/images',
            resource_type: 'image',
        };

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
                .then((results) =>
                    resolve(
                        results.map((x) => ({
                            id: x.public_id,
                            url: x.secure_url,
                        })),
                    ),
                )
                .catch((error) => reject(error));
        });
    }

    removeFile(id: string): Promise<CloudinaryResponse[]> {
        return cloudinary.uploader.destroy(id);
    }
}
