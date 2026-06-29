import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabaseAdmin } from "@/lib/supabase";
import { resend } from "@/lib/resend";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const registrationId = session.metadata?.registration_id;

    if (!registrationId) return NextResponse.json({ received: true });

    // Update registration to paid
    const { data: reg } = await supabaseAdmin
      .from("registrations")
      .update({
        payment_status: "paid",
        stripe_payment_intent: session.payment_intent as string,
        amount_paid: session.amount_total,
      })
      .eq("id", registrationId)
      .select()
      .single();

    if (!reg) return NextResponse.json({ received: true });

    // Send confirmation email to parent (BCC admins)
    const bccEmails = ["jyohanan25@gmail.com", "Jbovrlperformance@gmail.com", "jortega@mijoculture.com", "CoachE@bmfsports.org"];
    await resend.emails.send({
      from: "Mijos Tóxicos Camp <noreply@mijostoxicos.com>",
      to: reg.parent_email,
      bcc: bccEmails,
      subject: "✅ Registration Confirmed – Mijos Tóxicos Dual Sports Camp",
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
          <!-- Header with gradient -->
          <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:48px 32px 40px;text-align:center;">
            <p style="font-size:48px;margin:0 0 12px;">🏈⚽</p>
            <h1 style="font-size:28px;font-weight:900;color:#fff;margin:0 0 8px;letter-spacing:-0.5px;">You're In!</h1>
            <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:0;">Mijos Tóxicos Dual Sports Camp</p>
          </div>

          <!-- Body -->
          <div style="padding:36px 32px;">
            <p style="color:#fff;font-size:16px;line-height:1.6;margin:0 0 20px;">Hi ${reg.parent_name},</p>
            <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.6;margin:0 0 28px;">
              <strong style="color:#fff;">${reg.athlete_first_name} ${reg.athlete_last_name}</strong> is officially registered for the 
              <strong style="color:#fff;">${reg.sport === "football" ? "Football" : "Soccer"}</strong> camp. We can't wait to see them on the field.
            </p>

            <!-- Registration Details Card -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;margin:0 0 20px;">
              <p style="margin:0 0 14px;color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.15em;font-weight:700;">Registration Details</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.06);">Sport</td>
                  <td style="padding:8px 0;color:#fff;font-size:13px;text-align:right;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.06);">${reg.sport === "football" ? "Football" : "Soccer"}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.06);">School</td>
                  <td style="padding:8px 0;color:#fff;font-size:13px;text-align:right;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.06);">${reg.school_name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;border-bottom:1px solid rgba(255,255,255,0.06);">Grade</td>
                  <td style="padding:8px 0;color:#fff;font-size:13px;text-align:right;font-weight:600;border-bottom:1px solid rgba(255,255,255,0.06);">${reg.grade}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0;color:rgba(255,255,255,0.5);font-size:13px;">Shirt Size</td>
                  <td style="padding:8px 0;color:#fff;font-size:13px;text-align:right;font-weight:600;">${reg.shirt_size}</td>
                </tr>
              </table>
            </div>

            <!-- Location Card -->
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:24px;margin:0 0 28px;">
              <p style="margin:0 0 14px;color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.15em;font-weight:700;">📍 Camp Location</p>
              <p style="margin:0 0 4px;color:#fff;font-size:15px;font-weight:700;">Lawndale High School</p>
              <p style="margin:0;color:rgba(255,255,255,0.6);font-size:14px;">14901 S Inglewood Ave, Lawndale, CA 90260</p>
            </div>

            <!-- Date highlight -->
            <div style="text-align:center;padding:20px;background:linear-gradient(135deg,rgba(255,215,0,0.08),rgba(255,140,0,0.08));border:1px solid rgba(255,215,0,0.15);border-radius:14px;margin:0 0 28px;">
              <p style="margin:0 0 4px;color:rgba(255,255,255,0.5);font-size:11px;text-transform:uppercase;letter-spacing:0.15em;">Save the Date</p>
              <p style="margin:0;color:#fff;font-size:22px;font-weight:800;">June 13, 2026</p>
            </div>

            <p style="color:rgba(255,255,255,0.5);font-size:13px;line-height:1.6;margin:0 0 8px;">More details about check-in time and what to bring will be sent closer to the event.</p>
            <p style="color:#fff;font-size:15px;font-weight:600;margin:24px 0 0;">See you on the field 🔥</p>
          </div>

          <!-- Footer -->
          <div style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.25);font-size:11px;">Mijos Tóxicos Dual Sports Camp · Powered by Mijo Culture</p>
          </div>
        </div>
      `,
    });

    // Notify admin
    const adminEmails = process.env.ADMIN_EMAIL!.split(",").map((e) => e.trim());
    await resend.emails.send({
      from: "Mijos Tóxicos Camp <noreply@mijostoxicos.com>",
      to: adminEmails,
      subject: `New Registration: ${reg.athlete_first_name} ${reg.athlete_last_name} (${reg.sport})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2>New Paid Registration</h2>
          <p><strong>Athlete:</strong> ${reg.athlete_first_name} ${reg.athlete_last_name}</p>
          <p><strong>Sport:</strong> ${reg.sport}</p>
          <p><strong>Age:</strong> ${reg.athlete_age}</p>
          <p><strong>School:</strong> ${reg.school_name} · ${reg.grade}</p>
          <p><strong>Parent:</strong> ${reg.parent_name} (${reg.parent_email} / ${reg.parent_phone})</p>
          <p><strong>Amount Paid:</strong> $${((reg.amount_paid || 0) / 100).toFixed(2)}</p>
          <p><strong>Scholarship Interest:</strong> ${reg.scholarship_interest ? "Yes" : "No"}</p>
          <p><strong>Registration ID:</strong> ${reg.id}</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ received: true });
}
