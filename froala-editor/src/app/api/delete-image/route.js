import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function DELETE(request) {
    const data = await request.json();
    const imageUrl = data.imageUrl;

    if (!imageUrl) {
        return NextResponse.json({ error: "No image URL provided" }, { status: 400 });
    }

    // Extract filename from the URL
    const filename = imageUrl.split('/').pop();
    const filePath = path.join(process.cwd(), "public/uploads", filename);

    try {
        // Check if file exists
        if (fs.existsSync(filePath)) {
            // Delete the file
            fs.unlinkSync(filePath);
            return NextResponse.json({
                success: true,
                message: "Image deleted successfully"
            });
        } else {
            return NextResponse.json({
                error: "File not found"
            }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({
            error: "Error deleting file"
        }, { status: 500 });
    }
}
