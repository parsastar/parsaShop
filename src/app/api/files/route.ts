import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

// Utility to generate a unique file name
function generateUniqueFileName(originalName: string): string {
  const ext = path.extname(originalName); // Extract file extension
  const baseName = path.basename(originalName, ext); // Extract file name without extension
  const timestamp = Date.now(); // Use a timestamp for uniqueness
  return `${baseName}-${timestamp}${ext}`; // Append timestamp to the base name
}

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData);
  const file = (body.file as Blob) || null;

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Check if the file already exists and generate a unique name if necessary
    let fileName = (body.file as File).name;
    let filePath = path.resolve(UPLOAD_DIR, fileName);

    if (fs.existsSync(filePath)) {
      fileName = generateUniqueFileName(fileName);
      filePath = path.resolve(UPLOAD_DIR, fileName);
    }

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      success: true,
      name: fileName,
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "No file provided.",
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { success: false, message: "File name is required." },
        { status: 400 }
      );
    }

    const filePath = path.resolve(UPLOAD_DIR, fileName);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { success: false, message: "File does not exist." },
        { status: 404 }
      );
    }

    fs.unlinkSync(filePath);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting file." },
      { status: 500 }
    );
  }
};
