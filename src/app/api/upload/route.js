import { axiosWithoutAuth } from "@/api";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const contentType = req.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      // For base64 image (optional — not recommended for large files)
      const { image } = await req.json();
      console.log(image);
      const data = await axiosWithoutAuth.post("upload/image", {
        body: JSON.stringify({ image }),
      });
      console.log(data);
      return NextResponse.json(data);
    } else {
      // For multipart/form-data (file upload)
      const formData = await req.formData();
      const file = formData.get("video") || formData.get("file");

      if (!file || !(file instanceof File)) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 }
        );
      }

      const uploadForm = new FormData();
      uploadForm.append("file", file);
      const responseData = await axiosWithoutAuth.post("upload/image", {
        body: uploadForm,
      });

      return NextResponse.json(responseData);
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
