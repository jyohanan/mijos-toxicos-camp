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

    // Send confirmation email to parent
    await resend.emails.send({
      from: "Mijos Tóxicos Camp <noreply@mijoculture.com>",
      to: reg.parent_email,
      subject: "Registration Confirmed – Mijos Tóxicos Dual Sports Camp",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#050505;color:#fff;padding:32px;border-radius:16px;">
          <h1 style="font-size:24px;font-weight:900;margin-bottom:8px;">You're registered! 🏈⚽</h1>
          <p style="color:#aaa;margin-bottom:24px;">Mijos Tóxicos Dual Sports Camp · June 13, 2026</p>
          <p>Hi ${reg.parent_name},</p>
          <p><strong>${reg.athlete_first_name} ${reg.athlete_last_name}</strong> is officially registered for the <strong>${reg.sport === "football" ? "Football" : "Soccer"}</strong> camp.</p>
          <div style="background:#111;border-radius:12px;padding:16px;margin:24px 0;">
            <p style="margin:0 0 8px;color:#aaa;font-size:12px;text-transform:uppercase;letter-spacing:0.1em;">Registration Details</p>
            <p style="margin:4px 0;">Sport: ${reg.sport === "football" ? "Football" : "Soccer"}</p>
            <p style="margin:4px 0;">School: ${reg.school_name}</p>
            <p style="margin:4px 0;">Grade: ${reg.grade}</p>
            <p style="margin:4px 0;">Shirt Size: ${reg.shirt_size}</p>
          </div>
          <p style="color:#aaa;font-size:13px;">More details about check-in time, location, and what to bring will be sent closer to the event. Stay tuned!</p>
          <p style="margin-top:24px;">See you on June 13 🔥</p>
        </div>
      `,
    });

    // Notify admin
    await resend.emails.send({
      from: "Mijos Tóxicos Camp <noreply@mijoculture.com>",
      to: process.env.ADMIN_EMAIL!,
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
