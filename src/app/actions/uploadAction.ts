"use server";
import { requireAdmin } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData): Promise<{ url: string } | { error: string }> {
  await requireAdmin();
  try {
    const file = formData.get("file") as File;
    if (!file) return { error: "No file provided" };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const url = await new Promise<string>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "serene-sri-lanka" },
        (error, result) => {
          if (error) reject(error.message);
          else resolve(result!.secure_url);
        }
      ).end(buffer);
    });

    return { url };
  } catch (error: any) {
    return { error: error.message || "Upload failed" };
  }
}
