import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import { isAdminEmail } from "@/lib/admin";

export async function POST(req: NextRequest) {
  const adminEmail = req.headers.get("x-admin-email");
  if (!adminEmail || !isAdminEmail(adminEmail)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Get all paid registrations
  const { data: registrations, error: dbError } = await supabaseAdmin
    .from("registrations")
    .select("id, athlete_first_name, athlete_last_name, parent_name, parent_email")
    .eq("payment_status", "paid");

  if (dbError || !registrations) {
    return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 });
  }

  let sent = 0;
  let failed = 0;

  for (const reg of registrations) {
    try {
      await resend.emails.send({
        from: "Mijos Tóxicos Camp <noreply@mijostoxicos.com>",
        to: reg.parent_email,
        subject: "Disregard Previous Email – You're All Set!",
        html: `
          <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
            <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:40px 32px;text-align:center;">
              <h1 style="font-size:22px;font-weight:900;color:#fff;margin:0;">Please Disregard Previous Email</h1>
            </div>
            <div style="padding:32px;">
              <p style="color:#fff;font-size:15px;line-height:1.6;margin:0 0 16px;">Hi ${reg.parent_name},</p>
              <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.6;margin:0 0 20px;">
                You may have received an email asking to complete payment for the Mijos Tóxicos Camp. Please disregard — <strong style="color:#fff;">${reg.athlete_first_name} ${reg.athlete_last_name} is fully registered and paid.</strong> No further action is needed.
              </p>
              <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.6;margin:0 0 20px;">
                We apologize for the confusion. See you tomorrow at Lawndale High School!
              </p>
              <p style="color:#fff;font-size:15px;font-weight:600;margin:24px 0 0;">– Mijos Tóxicos Camp Team</p>
            </div>
            <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.25);font-size:11px;">Mijos Tóxicos Dual Sports Camp · Powered by Mijo Culture</p>
            </div>
          </div>
        `,
      });
      sent++;
    } catch {
      failed++;
    }
  }

  return NextResponse.json({ sent, failed, total: registrations.length });
}
