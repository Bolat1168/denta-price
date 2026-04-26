import type { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from "google-auth-library";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "postmessage");
    const { code } = req.body;
    const { tokens } = await client.getToken(code);
    const ticket = await client.verifyIdToken({ idToken: tokens.id_token!, audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID });
    res.status(200).json({ dentistId: ticket.getPayload()?.sub });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
