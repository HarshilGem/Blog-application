import fs from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const form = new IncomingForm({
      uploadDir,
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Upload error:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      if (!files.file || !files.file[0]) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const file = files.file[0];
      const fileName = `${Date.now()}-${file.originalFilename}`;
      const filePath = `/uploads/${fileName}`;

      // Move the file to the uploads directory with the new name
      const oldPath = file.filepath;
      const newPath = path.join(uploadDir, fileName);
      
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error('File move error:', err);
          return res.status(500).json({ error: 'Error saving file' });
        }
        return res.status(200).json({ filePath });
      });
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
} 