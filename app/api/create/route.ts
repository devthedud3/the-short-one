import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

const urlDatabase: any = {};

export async function POST(req: Request, res: Response) {
  try {
    const { longUrl } = await req.json();
    const id = nanoid(7);
    urlDatabase[id] = longUrl;
    console.log(urlDatabase);
    return NextResponse.json({
      shortUrl: `${process.env.NEXT_DEV_BASE_URL}/${id}`,
    });
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
