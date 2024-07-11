import { pool } from "@/database/client";
import { NextResponse } from "next/server";

interface UrlDatabase {
  id: string;
}

export async function GET(req: Request, context: UrlDatabase) {
  //@ts-ignore
  const { id } = context.params;

  const response = await pool.query("SELECT * FROM urls WHERE id = $1", [id]);
  const { rows } = await response;
  if (rows.length !== 0) {
    return NextResponse.json({ longUrl: rows[0].long_url });
  }
  return NextResponse.json({ longUrl: [] });
}
