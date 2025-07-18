import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

const CLOUDINARY_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", upload_preset: CLOUDINARY_PRESET },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    return NextResponse.json({ url: (result as any).secure_url });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
