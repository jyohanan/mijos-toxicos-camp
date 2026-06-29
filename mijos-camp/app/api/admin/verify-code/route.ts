import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ error: "Missing email or code" }, { status: 400 });
  }

  const { data: stored } = await supabaseAdmin
    .from("admin_otp")
    .select("code, expires_at")
    .eq("email", email)
    .single();

  if (!stored || stored.code !== code) {
    return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  }

  if (Date.now() > stored.expires_at) {
    await supabaseAdmin.from("admin_otp").delete().eq("email", email);
    return NextResponse.json({ error: "Code expired" }, { status: 401 });
  }

  // Code is valid — clean up
  await supabaseAdmin.from("admin_otp").delete().eq("email", email);

  return NextResponse.json({ success: true });
}
