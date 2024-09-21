import { google } from 'googleapis';
import fs from 'fs';

const authClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

authClient.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: 'v3', auth: authClient });

export const uploadNotesToDrive = async (notes) => {
  const fileMetadata = { name: 'notes.json', mimeType: 'application/json' };
  const media = { mimeType: 'application/json', body: JSON.stringify(notes) };

  await drive.files.update({
    fileId: process.env.GOOGLE_DRIVE_FILE_ID,
    media,
    resource: fileMetadata,
  });
};

export const downloadNotesFromDrive = async () => {
  const res = await drive.files.get({
    fileId: process.env.GOOGLE_DRIVE_FILE_ID,
    alt: 'media',
  });
  return JSON.parse(res.data);
};
