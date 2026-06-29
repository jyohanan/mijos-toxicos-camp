import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { isAdminEmail } from "@/lib/admin";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !isAdminEmail(email)) {
    // Don't reveal whether the email is valid
    return NextResponse.json({ success: true });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  // Store OTP in Supabase (upsert to handle re-sends)
  await supabaseAdmin
    .from("admin_otp")
    .upsert({ email, code, expires_at: expiresAt }, { onConflict: "email" });

  try {
    await resend.emails.send({
      from: "Mijos Camp Admin <camp@mijostoxicos.com>",
      to: email,
      subject: "Your admin access code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="margin: 0 0 8px;">Admin Access Code</h2>
          <p style="color: #666; margin: 0 0 24px;">Use this code to access the Mijos Camp admin dashboard.</p>
          <div style="background: #f5f5f5; border-radius: 12px; padding: 20px; text-align: center;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px;">${code}</span>
          </div>
          <p style="color: #999; font-size: 13px; margin-top: 24px;">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send OTP email:", err);
    return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
