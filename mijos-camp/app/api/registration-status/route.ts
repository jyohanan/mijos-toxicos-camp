import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data } = await supabaseAdmin
    .from("settings")
    .select("key, value")
    .in("key", ["registration_open", "max_registrations", "max_football", "max_soccer"]);

  const settings = Object.fromEntries((data || []).map((s) => [s.key, s.value]));

  const { count: totalCount } = await supabaseAdmin
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .in("payment_status", ["paid", "pending"]);

  const { count: footballCount } = await supabaseAdmin
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("sport", "football")
    .in("payment_status", ["paid", "pending"]);

  const { count: soccerCount } = await supabaseAdmin
    .from("registrations")
    .select("*", { count: "exact", head: true })
    .eq("sport", "soccer")
    .in("payment_status", ["paid", "pending"]);

  const maxTotal = parseInt(settings.max_registrations || "1000");
  const maxFootball = parseInt(settings.max_football || "500");
  const maxSoccer = parseInt(settings.max_soccer || "500");

  let open = settings.registration_open === "true";
  let reason = "";

  if (!open) {
    reason = "Registration is currently closed.";
  } else if (totalCount !== null && totalCount >= maxTotal) {
    open = false;
    reason = "Registration is full. All spots have been taken.";
  }

  return NextResponse.json({
    open,
    reason,
    footballFull: footballCount !== null && footballCount >= maxFootball,
    soccerFull: soccerCount !== null && soccerCount >= maxSoccer,
  });
}
