import { NextResponse } from "next/server";
import cloudinary from "../../../../lib/cloudinary";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type");

    if (contentType.includes("application/json")) {
      // Image upload (Base64)
      const { image } = await req.json();
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        folder: "nextjs_uploads",
        resource_type: "image",
      });

      return NextResponse.json({ url: uploadedResponse.secure_url });
    } else {
      // Video upload (FormData)
      const formData = await req.formData();
      const file = formData.get("video");
      if (!file)
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadedResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "video", folder: "nextjs_uploads" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });

      return NextResponse.json({ url: uploadedResponse.secure_url });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
