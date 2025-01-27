import fs from 'fs';
import path from 'path';
import { NextResponse } from "next/server";
import GithubSlugger from "github-slugger";

// Helper function to replace {{uniqid}} with the current timestamp
const replaceUniqidWithTimestamp = (content) => {
  const timestamp = "inst" + Date.now();;
  return content.replace(/{{uniqid}}/g, timestamp);
};

export async function POST(request) {
  const slugger = new GithubSlugger();
  let payload = await request.json();
  let { title, value } = payload;

  if (!title) {
    return NextResponse.json({ result: "request field not found" }, { status: 400 });
  }

  title = slugger.slug(title);

  if (title && value) {
    try {
      // Modify the value to insert the new lines after the image line
      value = replaceUniqidWithTimestamp(value);
      const lines = value.split('\n');
      const newLines = [
        'publishedAt: "2022-01-01"',
        'updatedAt: "2022-01-01"'
      ];

      const imageLineIndex = lines.findIndex(line => line.startsWith('image:'));
      if (imageLineIndex !== -1) {
        lines.splice(imageLineIndex + 1, 0, ...newLines);
      }

      const modifiedValue = lines.join('\n');

      const folderPath = path.join(process.cwd(), 'content/blogDraft', title);

      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const filePath = path.join(folderPath, 'index.mdx');
      fs.writeFileSync(filePath, modifiedValue);

      return NextResponse.json({ result: "new file added" }, { status: 200 });
    } catch (err) {
      console.error('Error creating file:', err);
      return NextResponse.json({ result: err }, { status: 200 });
    }
  } else {
    return NextResponse.json({ result: "file not found" }, { status: 200 });
  }
}
