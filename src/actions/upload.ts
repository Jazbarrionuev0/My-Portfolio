"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadImageAction(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;

  if (!file) {
    const error = new Error("No file provided");
    throw error;
  }

  const timestamp = new Date().toISOString().replace(/[:.-]/g, "");
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const contentType = file.type;

  const filename = `${timestamp}.${extension}`;

  const s3Client = new S3Client({
    endpoint: process.env.DO_SPACES_ENDPOINT,
    region: process.env.DO_SPACES_REGION,
    credentials: {
      accessKeyId: process.env.DO_SPACES_KEY || "",
      secretAccessKey: process.env.DO_SPACES_SECRET || "",
    },
    forcePathStyle: true,
  });

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.DO_SPACES_BUCKET,
      Key: filename,
      Body: buffer,
      ACL: "public-read",
      ContentType: contentType,
    });

    await s3Client.send(command);

    const imageUrl = `https://${process.env.DO_SPACES_BUCKET}.${process.env.DO_SPACES_ENDPOINT?.replace("https://", "")}/${filename}`;

    return imageUrl;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
}
