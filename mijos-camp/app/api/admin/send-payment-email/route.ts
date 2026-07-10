import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";
import { resend } from "@/lib/resend";
import { isAdminEmail } from "@/lib/admin";

export async function POST(req: NextRequest) {
  const adminEmail = req.headers.get("x-admin-email");
  if (!adminEmail || !isAdminEmail(adminEmail)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { registrationIds } = await req.json();

  if (!registrationIds || !Array.isArray(registrationIds) || registrationIds.length === 0) {
    return NextResponse.json({ error: "No registration IDs provided" }, { status: 400 });
  }

  const results: { id: string; success: boolean; error?: string }[] = [];

  for (const registrationId of registrationIds) {
    try {
      // Fetch the registration
      const { data: reg, error: dbError } = await supabaseAdmin
        .from("registrations")
        .select("*")
        .eq("id", registrationId)
        .single();

      if (dbError || !reg) {
        results.push({ id: registrationId, success: false, error: "Not found" });
        continue;
      }

      if (reg.payment_status === "paid") {
        results.push({ id: registrationId, success: false, error: "Already paid" });
        continue;
      }

      // Determine price based on age
      const isYouth = reg.athlete_age >= 8 && reg.athlete_age <= 12;
      const price = isYouth ? 7500 : parseInt(process.env.REGISTRATION_PRICE || "9900");
      const appUrl = process.env.NEXT_PUBLIC_APP_URL;

      // Create a fresh Stripe checkout session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: reg.parent_email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: price,
              product_data: {
                name: "Mijos Tóxicos Dual Sports Camp",
                description: isYouth
                  ? `Youth Registration for ${reg.athlete_first_name} ${reg.athlete_last_name} · Football + Soccer`
                  : `Registration for ${reg.athlete_first_name} ${reg.athlete_last_name} · ${reg.sport === "football" ? "Football" : reg.sport === "soccer" ? "Soccer" : "Football + Soccer"}`,
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          registration_id: reg.id,
        },
        success_url: `${appUrl}/register/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/register?cancelled=true`,
      });

      // Update the stored session ID
      await supabaseAdmin
        .from("registrations")
        .update({ stripe_session_id: session.id })
        .eq("id", reg.id);

      // Send payment email to parent
      await resend.emails.send({
        from: "Mijos Tóxicos Camp <noreply@mijostoxicos.com>",
        to: reg.parent_email,
        subject: "Complete Your Payment – Mijos Tóxicos Camp",
        html: `
          <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,0.08);">
            <div style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:40px 32px;text-align:center;">
              <h1 style="font-size:24px;font-weight:900;color:#fff;margin:0 0 8px;">Complete Your Registration</h1>
              <p style="color:rgba(255,255,255,0.6);font-size:14px;margin:0;">Mijos Tóxicos Dual Sports Camp · July 11, 2026</p>
            </div>
            <div style="padding:32px;">
              <p style="color:#fff;font-size:15px;line-height:1.6;margin:0 0 16px;">Hi ${reg.parent_name},</p>
              <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.6;margin:0 0 24px;">
                <strong style="color:#fff;">${reg.athlete_first_name} ${reg.athlete_last_name}</strong> is registered for camp but payment is still pending. Use the link below to complete payment and secure their spot.
              </p>
              <div style="text-align:center;margin:28px 0;">
                <a href="${session.url}" style="display:inline-block;background:#D4AF37;color:#000;font-weight:800;font-size:15px;padding:16px 40px;border-radius:14px;text-decoration:none;">Pay Now – $${(price / 100).toFixed(0)}</a>
              </div>
              <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px;margin:24px 0;">
                <p style="margin:0 0 12px;color:rgba(255,255,255,0.4);font-size:11px;text-transform:uppercase;letter-spacing:0.15em;font-weight:700;">Camp Details</p>
                <p style="margin:4px 0;color:#fff;font-size:13px;">Date: Saturday, July 11, 2026</p>
                <p style="margin:4px 0;color:#fff;font-size:13px;">Location: Lawndale High School, 14901 S Inglewood Ave, Lawndale, CA 90260</p>
                <p style="margin:4px 0;color:#fff;font-size:13px;">Sport: ${reg.sport === "both" ? "Football + Soccer (Full Day Access)" : reg.sport === "football" ? "Football" : "Soccer"}</p>
                <p style="margin:4px 0;color:#fff;font-size:13px;">Time: ${reg.sport === "both" ? "Football 7:30 AM – 12:30 PM + Soccer 12:30 PM – 5:30 PM" : reg.sport === "football" ? "Football 7:30 AM – 12:30 PM" : "Soccer 12:30 PM – 5:30 PM"}</p>
                ${!isYouth ? '<p style="margin:8px 0 0;color:rgba(212,175,55,0.9);font-size:12px;font-weight:600;">Eligible for $5,000 scholarship consideration</p>' : ""}
              </div>
              <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:20px 0 0;text-align:center;">This link expires in 24 hours. Email mijos.toxicos.admin@gmail.com if you need a new payment URL.</p>
            </div>
            <div style="padding:16px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.25);font-size:11px;">Mijos Tóxicos Dual Sports Camp · Powered by Mijo Culture</p>
            </div>
          </div>
        `,
      });

      results.push({ id: registrationId, success: true });
    } catch (err: unknown) {
      results.push({ id: registrationId, success: false, error: err instanceof Error ? err.message : "Unknown error" });
    }
  }

  const successCount = results.filter((r) => r.success).length;
  const failCount = results.filter((r) => !r.success).length;

  return NextResponse.json({ results, successCount, failCount });
}
