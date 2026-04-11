import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/admin";

const CSV_HEADERS = [
  "ID",
  "Created At",
  "First Name",
  "Last Name",
  "Age",
  "DOB",
  "Gender",
  "Sport",
  "Position",
  "School",
  "Grade",
  "Shirt Size",
  "Parent Name",
  "Parent Email",
  "Parent Phone",
  "Emergency Name",
  "Emergency Phone",
  "Medical Notes",
  "Insurance",
  "Social Handle",
  "Heard From",
  "Scholarship Interest",
  "Waiver Accepted",
  "Payment Status",
  "Amount Paid",
  "Stripe Session ID",
];

function escapeCSV(val: unknown): string {
  if (val === null || val === undefined) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(req: NextRequest) {
  const email = req.headers.get("x-admin-email");

  if (!isAdminEmail(email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data || []).map((r) =>
    [
      r.id,
      r.created_at,
      r.athlete_first_name,
      r.athlete_last_name,
      r.athlete_age,
      r.athlete_dob,
      r.gender,
      r.sport,
      r.position,
      r.school_name,
      r.grade,
      r.shirt_size,
      r.parent_name,
      r.parent_email,
      r.parent_phone,
      r.emergency_name,
      r.emergency_phone,
      r.medical_notes,
      r.insurance_provider,
      r.social_handle,
      r.heard_from,
      r.scholarship_interest,
      r.waiver_accepted,
      r.payment_status,
      r.amount_paid ? (r.amount_paid / 100).toFixed(2) : "",
      r.stripe_session_id,
    ]
      .map(escapeCSV)
      .join(",")
  );

  const csv = [CSV_HEADERS.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=registrations-${new Date().toISOString().split("T")[0]}.csv`,
    },
  });
}
