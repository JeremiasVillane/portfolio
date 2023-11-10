import { Contact } from "@/db";
import { getter, poster } from "@/db/helpers";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const contactGetterResult: NextResponse = await getter(Contact);
  return contactGetterResult;
}

export async function POST(req: NextRequest) {
  const contactPosterResult: NextResponse = await poster(Contact, req);
  return contactPosterResult;
}
