import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { pool } from "@/database/client";

const urlDatabase: any = {};

export async function POST(req: Request, res: Response) {
  const { origin } = new URL(req.url);
  try {
    const { longUrl } = await req.json();
    const id = nanoid(7);

    const { rows } = await pool.query(
      "SELECT * FROM urls WHERE long_url = $1",
      [longUrl]
    );

    if (rows.length === 0) {
      await pool.query("INSERT INTO urls VALUES ($1, $2, 0)", [id, longUrl]);

      return NextResponse.json({
        shortUrl: `${origin}/${id}`,
      });
    }
    return NextResponse.json({
      shortUrl: `${origin}/${rows[0].id}`,
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
