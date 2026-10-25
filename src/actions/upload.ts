"use server";

import { v2 as cloudinary, type UploadApiOptions, type UploadApiResponse } from "cloudinary";
import { requireAuth } from "@/src/lib/auth";

const MAX_FILE_SIZE = 100 * 1024 * 1024;

function configureCloudinary() {
  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ url: process.env.CLOUDINARY_URL, secure: true });
    return;
  }

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary credentials are missing");
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true,
  });
}

async function uploadFile(formData: FormData, type: "image" | "video"): Promise<string> {
  await requireAuth();

  const file = formData.get("file");
  if (!file || typeof file === "string") {
    throw new Error("No file provided");
  }
  if (!file.type.startsWith(`${type}/`)) {
    throw new Error(`Only ${type} files are allowed`);
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File must be 100 MB or smaller");
  }

  configureCloudinary();
  const buffer = Buffer.from(await file.arrayBuffer());
  const folder = "portfolio-jami";
  const folderOptions: UploadApiOptions =
    process.env.CLOUDINARY_FOLDER_MODE === "fixed" ? { folder } : { asset_folder: folder };
  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: type,
          ...folderOptions,
          use_filename: true,
          unique_filename: true,
        },
        (error, uploaded) => {
          if (error || !uploaded) reject(error ?? new Error("Upload failed"));
          else resolve(uploaded);
        },
      )
      .end(buffer);
  });

  return result.secure_url;
}

export async function uploadImageAction(formData: FormData): Promise<string> {
  return uploadFile(formData, "image");
}

export async function uploadVideoAction(formData: FormData): Promise<string> {
  return uploadFile(formData, "video");
}
