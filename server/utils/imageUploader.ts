import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import { UploadedFile } from "express-fileupload";

export const uploadImageToCloudinary = async (
  file: UploadedFile,
  folder: string,
  height?: number,
  quality?: number | string
): Promise<UploadApiResponse> => {
  const options: UploadApiOptions = { folder };

  if (height) {
    options.height = height;
    options.crop = "scale"; // Usually needed if height is specified
  }

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
};
