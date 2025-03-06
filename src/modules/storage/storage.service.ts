import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { v4 } from 'uuid';
import { Readable } from 'typeorm/platform/PlatformTools';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
    private static readonly PRODUCT_RESOURCES_FOLDER = "1TdrbiNeiN6WP6mvasYLe3r_H-DDc4Wt3";
    private static readonly GOOGLE_DRIVE_RESOURCE_URL = "https://lh3.googleusercontent.com/d/";

    constructor(private configService: ConfigService) { }

    public async connect() {
        const auth = new google.auth.JWT({
            email: this.configService.getOrThrow('GOOGLE_DRIVE_EMAIL'),
            key: this.configService.getOrThrow('GOOGLE_DRIVE_KEY'),
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        return google.drive({ version: 'v3', auth });
    }

    public async upload(foldername: string, file: Express.Multer.File) {
        const drive = await this.connect();

        const [_, ext] = file.mimetype.split('/');
        const filename = v4();

        const metadata = {
            name: `${filename}.${ext}`, // Tên tệp sẽ lưu trên Google Drive
            parents: [foldername],
        };

        const stream = new Readable();
        stream.push(file.buffer); // Đẩy buffer vào stream
        stream.push(null); // Đánh dấu kết thúc stream

        const media = {
            mimeType: 'application/octet-stream', // Thay đổi nếu cần thiết
            body: stream,
        };

        const response = await drive.files.create({
            requestBody: metadata,
            media: media,
            fields: 'id',
        });

        const permission = {
            type: 'anyone',
            role: 'reader', // Hoặc 'writer' nếu bạn muốn người khác có thể chỉnh sửa
        };

        if (response.data.id) {
            await drive.permissions.create({
                requestBody: permission,
                fileId: response.data.id,
                fields: 'id',
            });
        }

        return `https://lh3.googleusercontent.com/d/${response.data.id}`;
    }


    public product() {
        return {
            upload: (file: Express.Multer.File) => this.upload(StorageService.PRODUCT_RESOURCES_FOLDER, file)
        }
    }


    /**
     * Delete by id
     * @param fileId 
     */
    async delete(fileId: string) {
        const drive = await this.connect();

        await drive.files.delete({
            fileId,
        });
    }


    /**
     * Delete by url
     * @param fileId 
     */
    async deleteFromUrl(url: string) {
        const fileId = url.replace(StorageService.GOOGLE_DRIVE_RESOURCE_URL, '');
        await this.delete(fileId);
    }
}
