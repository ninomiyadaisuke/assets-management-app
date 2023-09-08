import * as dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config({ path: ".env.local" });

export const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

export const sheets = google.sheets({ version: "v4", auth });
