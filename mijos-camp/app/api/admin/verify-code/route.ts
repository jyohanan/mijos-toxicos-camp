import { NextRequest, NextResponse } from "next/server";
import { otpStore } from "../send-code/route";

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ error: "Missing email or code" }, { status: 400 });
  }

  const stored = otpStore.get(email);

  if (!stored || stored.code !== code) {
    return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  }

  if (Date.now() > stored.expires) {
    otpStore.delete(email);
    return NextResponse.json({ error: "Code expired" }, { status: 401 });
  }

  // Code is valid — clean up
  otpStore.delete(email);

  return NextResponse.json({ success: true });
}
