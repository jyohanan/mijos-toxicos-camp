import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { stripe } from "@/lib/stripe";
import { RegistrationFormData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: RegistrationFormData = await req.json();

    // Basic validation
    if (!body.athlete_first_name || !body.parent_email || !body.waiver_accepted) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Check if registration is open
    const { data: settings } = await supabaseAdmin
      .from("settings")
      .select("key, value")
      .in("key", ["registration_open", "max_registrations", "max_football", "max_soccer"]);

    const settingsMap = Object.fromEntries((settings || []).map((s) => [s.key, s.value]));

    if (settingsMap.registration_open === "false") {
      return NextResponse.json({ error: "Registration is currently closed." }, { status: 400 });
    }

    // Check capacity caps
    const { count: totalCount } = await supabaseAdmin
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .in("payment_status", ["paid", "pending"]);

    const { count: sportCount } = await supabaseAdmin
      .from("registrations")
      .select("*", { count: "exact", head: true })
      .eq("sport", body.sport)
      .in("payment_status", ["paid", "pending"]);

    const maxTotal = parseInt(settingsMap.max_registrations || "1000");
    const maxSport = parseInt(settingsMap[`max_${body.sport}`] || "500");

    if (totalCount !== null && totalCount >= maxTotal) {
      return NextResponse.json({ error: "Registration is full. All spots have been taken." }, { status: 400 });
    }

    if (sportCount !== null && sportCount >= maxSport) {
      return NextResponse.json({ error: `${body.sport === "football" ? "Football" : "Soccer"} registration is full.` }, { status: 400 });
    }

    const price = parseInt(process.env.REGISTRATION_PRICE || "5000");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    // Save to Supabase with pending status
    const { data: registration, error: dbError } = await supabaseAdmin
      .from("registrations")
      .insert({
        athlete_first_name: body.athlete_first_name,
        athlete_last_name: body.athlete_last_name,
        athlete_age: parseInt(body.athlete_age),
        athlete_dob: body.athlete_dob || null,
        gender: body.gender,
        sport: body.sport,
        position: body.position || null,
        school_name: body.school_name,
        grade: body.grade,
        shirt_size: body.shirt_size,
        parent_name: body.parent_name,
        parent_email: body.parent_email,
        parent_phone: body.parent_phone,
        emergency_name: body.emergency_name,
        emergency_phone: body.emergency_phone,
        medical_notes: body.medical_notes || null,
        insurance_provider: body.insurance_provider || null,
        social_handle: body.social_handle || null,
        heard_from: body.heard_from || null,
        scholarship_interest: body.scholarship_interest,
        waiver_accepted: body.waiver_accepted,
        waiver_signed_at: new Date().toISOString(),
        payment_status: "pending",
      })
      .select()
      .single();

    if (dbError) throw new Error(dbError.message);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: body.parent_email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: "Mijos Tóxicos Dual Sports Camp",
              description: `Registration for ${body.athlete_first_name} ${body.athlete_last_name} · ${body.sport === "football" ? "Football" : "Soccer"}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        registration_id: registration.id,
      },
      success_url: `${appUrl}/register/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/register?cancelled=true`,
    });

    // Save stripe session id
    await supabaseAdmin
      .from("registrations")
      .update({ stripe_session_id: session.id })
      .eq("id", registration.id);

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (err: unknown) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Server error" },
      { status: 500 }
    );
  }
}
