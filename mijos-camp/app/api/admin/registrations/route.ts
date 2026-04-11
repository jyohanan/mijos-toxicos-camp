import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const email = req.headers.get("x-admin-email");
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!email || email !== adminEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sport = req.nextUrl.searchParams.get("sport");
  const status = req.nextUrl.searchParams.get("status");

  let query = supabaseAdmin
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (sport) query = query.eq("sport", sport);
  if (status) query = query.eq("payment_status", status);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ registrations: data });
}
