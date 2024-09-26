import {Request, Response, NextFunction} from 'express';
import cloudinary from './cloudinary';
import streamifier from 'streamifier';


export const uploadFile = (buffer: Buffer, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder : folder
            }, 
            (error: any, result: any) => {
            if (result) {
                resolve(result.secure_url);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
}
