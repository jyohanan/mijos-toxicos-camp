import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/admin";

export async function POST(req: NextRequest) {
  const email = req.headers.get("x-admin-email");

  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  if (!body.athlete_first_name || !body.athlete_last_name || !body.sport || !body.parent_email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .insert({
      athlete_first_name: body.athlete_first_name,
      athlete_last_name: body.athlete_last_name,
      athlete_age: body.athlete_age ? parseInt(body.athlete_age) : null,
      athlete_dob: body.athlete_dob || null,
      gender: body.gender || null,
      sport: body.sport,
      position: body.position || null,
      school_name: body.school_name || null,
      grade: body.grade || null,
      shirt_size: body.shirt_size || null,
      parent_name: body.parent_name || null,
      parent_email: body.parent_email,
      parent_phone: body.parent_phone || null,
      emergency_name: body.emergency_name || null,
      emergency_phone: body.emergency_phone || null,
      medical_notes: body.medical_notes || null,
      scholarship_interest: true,
      waiver_accepted: true,
      waiver_signed_at: new Date().toISOString(),
      payment_status: "paid",
      is_scholarship: true,
      amount_paid: 0,
      notes: body.notes || "Scholarship entry — added by admin",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ registration: data });
}
