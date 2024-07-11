import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const urlDatabase: any = {};

export async function GET(req: Request, res: { params: { id: string } }) {
  //@ts-ignore
  const { id } = res.params;

  console.log(res.params.id);

  return NextResponse.json({ longUrl: "https://google.com" });
}
