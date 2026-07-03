import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";
import { isAdminEmail } from "@/lib/admin";

export async function POST(req: NextRequest) {
  const adminEmail = req.headers.get("x-admin-email");
  if (!adminEmail || !isAdminEmail(adminEmail)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { registrationId } = await req.json();

  if (!registrationId) {
    return NextResponse.json({ error: "Missing registration ID" }, { status: 400 });
  }

  // Fetch the registration
  const { data: reg, error: dbError } = await supabaseAdmin
    .from("registrations")
    .select("*")
    .eq("id", registrationId)
    .single();

  if (dbError || !reg) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }

  if (reg.payment_status === "paid") {
    return NextResponse.json({ error: "Registration is already paid" }, { status: 400 });
  }

  const price = parseInt(process.env.REGISTRATION_PRICE || "5000");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  // Create a fresh Stripe checkout session tied to this registration
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
            description: `Registration for ${reg.athlete_first_name} ${reg.athlete_last_name} · ${reg.sport === "football" ? "Football" : "Soccer"}`,
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

  return NextResponse.json({ checkoutUrl: session.url });
}
