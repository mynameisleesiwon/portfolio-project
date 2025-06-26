import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { File as MulterFile } from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProfileImageService {
  constructor(private configService: ConfigService) {
    // Cloudinary 환경변수로 초기화 (운영 환경에서만 사용)
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  /**
   * 프로필 이미지를 업로드하고, 업로드된 이미지의 URL을 반환
   * 개발 환경: 로컬 uploads 폴더에 저장
   * 운영 환경: Cloudinary에 업로드
   */
  async uploadImage(file: MulterFile): Promise<string> {
    const nodeEnv = this.configService.get('NODE_ENV');
    if (nodeEnv === 'development') {
      // 개발 환경: 로컬에 저장
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      // 확장자 추출
      const ext = path.extname(file.originalname);
      // 안전한 파일명 생성 (예: uuid + 확장자)
      const safeFileName = `${uuidv4()}${ext}`;
      const filePath = path.join(uploadDir, safeFileName);
      fs.writeFileSync(filePath, file.buffer);

      const baseUrl = 'http://localhost:3000';
      return `${baseUrl}/uploads/${safeFileName}`;
    } else {
      // 운영 환경: Cloudinary 업로드
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'profile-images',
            upload_preset: this.configService.get('CLOUDINARY_UPLOAD_PRESET'),
          },
          (error, result) => {
            if (error || !result)
              return reject(error || new Error('No result from Cloudinary'));
            resolve(result.secure_url);
          },
        );
        Readable.from(file.buffer).pipe(uploadStream);
      });
    }
  }

  /**
   * 기존 프로필 이미지를 삭제
   * 개발 환경: 로컬 파일 삭제
   * 운영 환경: Cloudinary에서 삭제
   */
  async deleteImage(imageUrl: string): Promise<void> {
    if (!imageUrl) return;

    const nodeEnv = this.configService.get('NODE_ENV');

    if (nodeEnv === 'development') {
      // 개발 환경: 로컬 파일 삭제
      await this.deleteFromLocal(imageUrl);
    } else {
      // 운영 환경: Cloudinary에서 삭제
      await this.deleteFromCloudinary(imageUrl);
    }
  }

  /**
   * 로컬 파일 삭제
   */
  private async deleteFromLocal(imageUrl: string): Promise<void> {
    try {
      // URL에서 파일명 추출 (예: http://localhost:3000/uploads/uuid.jpg -> uuid.jpg)
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];

      if (fileName) {
        const filePath = path.join(process.cwd(), 'uploads', fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`로컬 파일 삭제 완료: ${fileName}`);
        }
      }
    } catch (error) {
      console.error('로컬 이미지 삭제 실패:', error);
    }
  }

  /**
   * Cloudinary에서 이미지 삭제
   */
  private async deleteFromCloudinary(imageUrl: string): Promise<void> {
    try {
      // URL에서 public_id 추출
      const publicId = this.extractPublicIdFromUrl(imageUrl);

      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Cloudinary 이미지 삭제 완료: ${publicId}`);
      }
    } catch (error) {
      console.error('Cloudinary 이미지 삭제 실패:', error);
    }
  }

  /**
   * Cloudinary URL에서 public_id 추출
   * 예: https://res.cloudinary.com/df5yrxjun/image/upload/v1750922836/profile-images/xuifnwovnojdrdw07hkl.jpg
   * -> profile-images/xuifnwovnojdrdw07hkl
   */
  private extractPublicIdFromUrl(url: string): string | null {
    try {
      // Cloudinary URL 패턴 확인
      if (!url.includes('cloudinary.com')) {
        return null;
      }

      const urlParts = url.split('/');
      const uploadIndex = urlParts.findIndex((part) => part === 'upload');

      if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
        const relevantParts = urlParts.slice(uploadIndex + 2);

        const lastPart = relevantParts[relevantParts.length - 1];
        const fileNameWithoutExt = lastPart.split('.')[0];
        relevantParts[relevantParts.length - 1] = fileNameWithoutExt;

        return relevantParts.join('/');
      }

      return null;
    } catch (error) {
      console.error('public_id 추출 실패:', error);
      return null;
    }
  }
}
