import Image from "next/image";
import Link from "next/link";

import HeroCarousel from "./components/HeroCarousel";
import CountdownTimer from "./components/CountdownTimer";
import SponsorMarquee from "./components/SponsorMarquee";
import ImageCarousel from "./components/ImageCarousel";
import { getSettings } from "@/lib/settings";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#details", label: "Details" },
  { href: "#gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "#register", label: "Register" },
];

const galleryImages = [
  { src: "/images/group_picture_2025.jpeg", alt: "Group photo 2025" },
  { src: "/images/kids_huddle_2025.jpeg", alt: "Kids huddle 2025" },
  { src: "/images/kids_lined_up_2025.jpeg", alt: "Kids lined up 2025" },
  { src: "/images/hands_in_2025.jpeg", alt: "Hands in 2025" },
  { src: "/images/will_speaking_2025.jpeg", alt: "Will speaking 2025" },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSettings();

  const campDate = settings.camp_date || "July 11, 2026";
  const campLocation = settings.camp_location || "LA";
  const campPrice = settings.registration_price || "99";

  const campDetails = [
    { label: "Date", value: campDate },
    { label: "Location", value: campLocation },
    { label: "Ages", value: "13–18" },
    { label: "Sports", value: "Football + Soccer" },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808] text-white">

      {/* Top nav bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] backdrop-blur-xl" style={{ background: "linear-gradient(to right, rgba(0,104,71,0.15), rgba(8,8,8,0.92), rgba(206,17,38,0.15))" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-10">
          <div className="flex items-center gap-3">
            <Image src="/images/mijo_logo.png" alt="Mijo Logo" width={32} height={32} className="rounded-lg object-contain" />
            <span className="text-white/30">×</span>
            <Image src="/images/chicos_toxicos.png" alt="Chicos Tóxicos" width={32} height={32} className="rounded-lg object-contain" />
            <span className="text-sm font-bold tracking-tight text-white">Mijos Tóxicos Camp</span>
          </div>
          <div className="hidden items-center gap-6 sm:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/60 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
          <Link href="/register" className="rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-semibold text-black transition hover:bg-[#C5A028]">
            Register Now
          </Link>
        </div>
      </nav>

      {/* Hero — Image */}
      <section className="relative h-[75vh] overflow-hidden pt-16 sm:h-[70vh]">
        <div className="absolute inset-0">
          <HeroCarousel />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        </div>
      </section>

      {/* Hero — Content */}
      <section className="relative bg-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-10 md:py-16">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-5">
              <Image src="/images/mijo_logo.png" alt="Mijo" width={80} height={80} className="rounded-2xl object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
              <span className="text-2xl text-white/30">×</span>
              <Image src="/images/chicos_toxicos.png" alt="Chicos Tóxicos" width={80} height={80} className="rounded-2xl object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">{campDate} · Ages 13–18</p>
            <h1 className="mt-4 font-[var(--font-oswald)] text-5xl font-bold uppercase leading-[0.92] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
              Mijos<br />Tóxicos<br /><span className="text-white/40">Football × Soccer</span><br />Camp
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/65 sm:text-xl md:text-2xl">
              Two camps. One day. Register for Football or Soccer based on your athlete&apos;s primary sport.
            </p>
            <div className="mt-8">
              <CountdownTimer />
            </div>

            {/* Camp clarity cards */}
            <div className="mt-8 grid w-full max-w-md grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-center backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/70">Morning</p>
                <p className="mt-1 text-lg font-[var(--font-oswald)] font-bold uppercase text-white">Football</p>
                <p className="mt-1 text-xs text-white/40">7:30 AM – 1:00 PM</p>
              </div>
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-center backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]/70">Afternoon</p>
                <p className="mt-1 text-lg font-[var(--font-oswald)] font-bold uppercase text-white">Soccer</p>
                <p className="mt-1 text-xs text-white/40">12:30 PM – 6:00 PM</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center rounded-2xl bg-[#D4AF37] px-7 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(212,175,55,0.3)] transition hover:scale-[1.02] hover:bg-[#C5A028]">
                Register Now
              </Link>
              <a href="#about" className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-white/90">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="relative py-10 sm:py-14 overflow-hidden">
        {/* Subtle Mexican flag gradient */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ background: "linear-gradient(to right, #006847, #006847 30%, #ffffff 45%, #ffffff 55%, #CE1126 70%, #CE1126)" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {campDetails.map((item, i) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.1] bg-white/[0.04] px-6 py-6 backdrop-blur-xl transition hover:border-white/[0.18] hover:bg-white/[0.07] sm:px-8 sm:py-8"
                style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 0 40px rgba(255,255,255,0.02)" }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/40">{item.label}</p>
                <p className={`mt-3 text-xl font-black tracking-tight sm:text-2xl ${i % 2 === 0 ? "text-green-500" : "text-red-500"}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* Meet the Mijos */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <ImageCarousel
            images={[
              { src: "/will_intro.jpg", alt: "Will Hernandez introduction" },
              { src: "/will_mx.jpg", alt: "Will Hernandez" },
              { src: "/images/headshots/Joshua_Ortega .png", alt: "Joshua Ortega" },
              { src: "/images/headshots/Derek_Elmendorf.png", alt: "Derek Elmendorff" },
              { src: "/images/mijos_bench_pic.png", alt: "Mijos on the bench" },
            ]}
          />
          <div>
            <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl text-center">
              Meet the Mijos
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
              The Mijo Foundation was built to open doors for the next generation — investing
              in character, opportunity, and growth. Founded by NFL offensive lineman Will Hernandez
              (Arizona Cardinals) alongside his mijos Joshua Ortega and Derek Elmendorff, the foundation
              reflects the values that shaped them on and off the field: discipline, resilience,
              and community.
            </p>
            <p className="mt-4 text-base leading-8 text-white/60 sm:text-lg">
              Through youth camps, educational support, and confidence-building programs, the
              foundation creates real impact — giving young people the tools to grow strong in
              every sense of the word.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* Meet the Chicos Tóxicos */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="order-2 lg:order-1">
            <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl text-center">
              Meet the Chicos T&oacute;xicos
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
              Chicos T&oacute;xicos is a brotherhood built on the grind — Felipito, Diego, and Brandom
              are a crew of athletes and creators with a widely popular YouTube channel who push
              each other through training, travel, and life. They bring that same energy to this
              camp, showing young athletes what it looks like to compete hard, stay tight, and
              build something real together.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <ImageCarousel
              images={[
                { src: "/images/headshots/Felipito.png", alt: "Felipito" },
                { src: "/images/headshots/Diego.png", alt: "Diego" },
                { src: "/images/headshots/Brandom.png", alt: "Brandom" },
                { src: "/images/cover_photo/ct_boys_x_mijos.png", alt: "Chicos Tóxicos and Mijo Foundation" },
                { src: "/ct_boys_football_field.png", alt: "Chicos Tóxicos on the football field" },
                { src: "/ct_plane.jpg", alt: "Chicos Tóxicos traveling" },
              ]}
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-10 md:py-32" id="about">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35 text-center">About the camp</p>
            <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl text-center">
              Built for the<br />next generation
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
              The Mijos Tóxicos Football × Soccer Camp is a one-day youth experience that brings football
              and soccer together in a high-energy environment. Built around competition, athletic
              development, culture, and community.
            </p>
            <p className="mt-4 text-base leading-8 text-white/60 sm:text-lg">
              From fundamentals to advanced skills, every session is designed to help athletes
              develop the tools they need to compete at the next level — whether that&apos;s high school
              varsity, college, or beyond.
            </p>
          </div>
          <div className="space-y-0">
            {[
              { num: "01", title: "Pro-led training", desc: "Learn directly from NFL athletes and experienced coaches — not just volunteers. This is real instruction from people who play at the highest level." },
              { num: "02", title: "Dual sport format", desc: "Football and soccer under one roof. ~500 athletes per sport, all competing, training, and building together in a single day." },
              { num: "03", title: "Scholarships available", desc: "One $5,000 scholarship per sport. We believe every athlete deserves a shot regardless of financial situation." },
              { num: "04", title: "Culture & community", desc: "More than just drills. This camp is about building confidence, discipline, and connection — on the field and beyond." },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-5 border-b border-white/[0.06] py-6 first:pt-0 last:border-0 last:pb-0">
                <span className="mt-0.5 text-sm font-bold tabular-nums text-white/20">{item.num}</span>
                <div>
                  <p className="text-base font-semibold text-white sm:text-lg">{item.title}</p>
                  <p className="mt-1.5 text-base leading-8 text-white/45">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* Promo Video */}
      <section className="px-4 py-16 sm:px-6 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/35">See it in action</p>
          <h2 className="mt-4 text-center text-3xl font-[var(--font-oswald)] font-bold uppercase tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">The Mijo Experience</h2>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0d0d0d]">
            <iframe
              src="https://www.youtube.com/embed/5T_q7kcxAg0"
              title="Mijos Tóxicos Camp 2025 Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full"
            />
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="px-4 py-16 sm:px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-[var(--font-oswald)] font-bold uppercase tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">Ready to Register?</h2>
          <p className="mt-4 text-base leading-8 text-white/55 sm:text-lg">Choose Football or Soccer and secure your athlete&apos;s spot today. Spaces are limited.</p>
          <div className="mt-8">
            <Link href="/register" className="inline-flex items-center justify-center rounded-2xl bg-[#D4AF37] px-8 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(212,175,55,0.3)] transition hover:scale-[1.02] hover:bg-[#C5A028]">
              Register Now
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* Camp Details */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-32" id="details">
        <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl text-center">Camp Schedule</h2>

        {/* Schedule — Dual Sport Itinerary */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Football — Morning */}
          <div>
            <div className="mb-4 rounded-2xl border border-[#D4AF37]/20 px-6 py-6 backdrop-blur-xl" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(255,255,255,0.02) 100%)", boxShadow: "inset 0 1px 0 0 rgba(212,175,55,0.12), 0 0 80px rgba(212,175,55,0.03)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]/60">Morning Session</p>
              <div className="mt-2 flex items-center justify-between">
                <h3 className="text-2xl font-[var(--font-oswald)] font-bold uppercase tracking-wide text-white">Football</h3>
                <span className="text-sm font-semibold tabular-nums text-white/50">7:30 AM – 12:30 PM</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {[
                { time: "7:30", event: "Athlete Check-In Opens", desc: "Registration and credential verification", highlight: "gold" },
                { time: "9:00", event: "Opening Ceremony", desc: "Welcome remarks, guest speakers, and athlete introductions", highlight: false },
                { time: "9:25", event: "Transition to the Field", desc: null, highlight: false },
                { time: "9:30", event: "Dynamic Warm-Up", desc: "Camp-wide warm-up led by coaches and special guests", highlight: false },
                { time: "9:50", event: "Competition Stations", desc: "Speed, agility, team, and head-to-head matchup rotations", highlight: false },
                { time: "11:00", event: "Competition Challenges", desc: "Influencers vs. Campers, 40-Yard Dash, Tug-of-War, and giveaways", highlight: false },
                { time: "12:00", event: "Closing Ceremony", desc: "Athlete recognition and final announcements", highlight: false },
                { time: "12:30", event: "Photos, Food & Meet-and-Greet", desc: "Photos with guests, food, and sponsor activations", highlight: "gold" },
              ].map((item, i) => (
                <div
                  key={`football-${i}`}
                  className={`flex gap-4 border-b border-white/[0.04] px-4 py-3.5 last:border-0 transition hover:bg-white/[0.03] ${
                    item.highlight === "gold" ? "bg-[#D4AF37]/[0.06]" : ""
                  }`}
                >
                  <span className="w-[52px] shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-[#D4AF37]">{item.time}</span>
                  <div className="min-w-0">
                    <span className={`text-sm font-medium ${item.highlight === "gold" ? "text-[#D4AF37]" : "text-white/80"}`}>{item.event}</span>
                    {item.desc && <p className="mt-0.5 text-xs leading-relaxed text-white/40">{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soccer — Afternoon */}
          <div>
            <div className="mb-4 rounded-2xl border border-[#D4AF37]/20 px-6 py-6 backdrop-blur-xl" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(255,255,255,0.02) 100%)", boxShadow: "inset 0 1px 0 0 rgba(212,175,55,0.12), 0 0 80px rgba(212,175,55,0.03)" }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4AF37]/60">Afternoon Session</p>
              <div className="mt-2 flex items-center justify-between">
                <h3 className="text-2xl font-[var(--font-oswald)] font-bold uppercase tracking-wide text-white">Soccer</h3>
                <span className="text-sm font-semibold tabular-nums text-white/50">12:30 PM – 5:30 PM</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {[
                { time: "12:30", event: "Athlete Check-In Opens", desc: "Registration and credential verification", highlight: "gold" },
                { time: "2:00", event: "Opening Ceremony", desc: "Welcome remarks, guest speakers, and athlete introductions", highlight: false },
                { time: "2:25", event: "Transition to the Field", desc: null, highlight: false },
                { time: "2:30", event: "Dynamic Warm-Up", desc: "Camp-wide warm-up led by coaches and special guests", highlight: false },
                { time: "2:50", event: "Competition Stations", desc: "Speed, agility, team, and head-to-head matchup rotations", highlight: false },
                { time: "4:00", event: "Competition Challenges", desc: "Influencers vs. Campers, Soccer Skills, Tug-of-War, and giveaways", highlight: false },
                { time: "5:00", event: "Closing Ceremony", desc: "Athlete recognition and final announcements", highlight: false },
                { time: "5:30", event: "Photos, Food & Meet-and-Greet", desc: "Photos with guests, food, and sponsor activations", highlight: "gold" },
              ].map((item, i) => (
                <div
                  key={`soccer-${i}`}
                  className={`flex gap-4 border-b border-white/[0.04] px-4 py-3.5 last:border-0 transition hover:bg-white/[0.03] ${
                    item.highlight === "gold" ? "bg-[#D4AF37]/[0.06]" : ""
                  }`}
                >
                  <span className="w-[52px] shrink-0 pt-0.5 text-xs font-semibold tabular-nums text-[#D4AF37]">{item.time}</span>
                  <div className="min-w-0">
                    <span className={`text-sm font-medium ${item.highlight === "gold" ? "text-[#D4AF37]" : "text-white/80"}`}>{item.event}</span>
                    {item.desc && <p className="mt-0.5 text-xs leading-relaxed text-white/40">{item.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What to Bring — Stacked rows */}
        <div className="mt-16 border-t border-white/[0.06] pt-12">
          <h3 className="text-xl font-[var(--font-oswald)] font-bold uppercase tracking-wide bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-2xl text-center">What to Bring</h3>
          <div className="mt-6 grid gap-x-12 gap-y-0 sm:grid-cols-2">
            {[
              { item: "Athletic cleats", note: "Football or soccer specific" },
              { item: "Gym shoes / sneakers", note: "For off-field activities" },
              { item: "Water bottle", note: "Stay hydrated all day" },
              { item: "Sunscreen", note: "Outdoor event — protect your skin" },
              { item: "Snacks", note: "Lunch is provided, but bring extras" },
              { item: "Positive attitude", note: "The most important thing you can bring 🔥" },
            ].map((entry) => (
              <div key={entry.item} className="flex items-start gap-4 border-b border-white/[0.04] py-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                <div>
                  <p className="text-base font-medium text-white/80">{entry.item}</p>
                  <p className="text-xs text-white/35">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Included — Stacked rows */}
        <div className="mt-12 border-t border-white/[0.06] pt-12">
          <h3 className="text-xl font-[var(--font-oswald)] font-bold uppercase tracking-wide bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-2xl text-center">Included with Registration</h3>
          <div className="mt-6 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { item: "Camp T-Shirt", note: "Custom event tee in your size" },
              { item: "Lunch", note: "Full meal provided on-site" },
              { item: "Professional Coaching & Instruction", note: "From experienced coaches and athletes" },
              { item: "Competition Stations", note: "Showcase games and head-to-head matchups" },
              { item: "Competition Challenges", note: "Large-group competitions and giveaways" },
              { item: "Scholarship Eligibility", note: "Opt in during registration" },
            ].map((entry) => (
              <div key={entry.item} className="flex items-start gap-4 border-b border-white/[0.04] py-4">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                <div>
                  <p className="text-base font-medium text-white/80">{entry.item}</p>
                  <p className="text-xs text-white/35">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* Scholarship */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
            2 Scholarships. 1 Opportunity.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
            The Mijo Foundation is committed to investing in the next generation of athletes. Two athletes will be awarded a $5,000 scholarship — one football athlete and one soccer athlete.
          </p>
          <p className="mt-4 text-base leading-8 text-white/60 sm:text-lg">
            To be considered, simply check the scholarship box during registration. No separate application needed. Recipients will be selected and notified before the event.
          </p>
          <div className="mt-8">
            <Link href="/register" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:scale-[1.02]">
              Apply During Registration
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* Gallery */}
      <section className="px-4 py-16 sm:px-6 md:px-10 md:py-20" id="gallery">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35 text-center">From the field</p>
          <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl text-center">2025 Highlights</h2>
        </div>
        <div className="mx-auto mt-8 max-w-7xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {galleryImages.map((img, i) => (
              <div key={img.src} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9] md:col-span-1 md:aspect-[4/5]" : "aspect-square"}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <SponsorMarquee />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* Register CTA */}
      <section className="px-4 py-20 sm:px-6 md:px-10 md:py-32" id="register">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#111]">
            <div className="absolute inset-0">
              <Image src="/images/kids_lined_up_2025.jpeg" alt="Athletes" fill className="object-cover object-center opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/90 to-[#111]/70" />
            </div>
            <div className="relative px-8 py-16 sm:px-12 md:py-20 lg:px-16">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35 text-center">Ready to compete?</p>
                <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl text-center">
                  Secure your<br />spot today
                </h2>
                <p className="mt-5 text-base leading-8 text-white/60 sm:text-lg">
                  Registration is ${campPrice}. Complete the form, sign the waiver, and pay online in minutes. Spots are limited.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/register" className="inline-flex items-center justify-center rounded-2xl bg-[#D4AF37] px-8 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(212,175,55,0.3)] transition hover:scale-[1.02] hover:bg-[#C5A028]">
                    Register Now
                  </Link>
                  <p className="text-xs text-white/40">~1,000 spots available · Football & Soccer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile bottom nav */}
      <div className="sticky bottom-0 z-20 border-t border-white/[0.06] bg-[#080808]/95 px-4 py-3 backdrop-blur-xl sm:hidden">
        <div className="flex items-center justify-between gap-2">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-2 py-2 text-center text-[11px] font-medium text-white/70 transition hover:bg-white/[0.06]">
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Shop & Support */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">Shop & support</p>
        <h2 className="mt-4 text-center text-3xl font-[var(--font-oswald)] font-bold uppercase tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">Rep the Culture</h2>
        <div className="mt-10 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {[
              { name: "Mijo Foundation", desc: "Empowering youth through sports, education, and opportunity.", href: "https://www.mijothingsfoundation.com", tag: "Foundation", img: "/images/shops/mijo_foundation_logo.png", ig: "https://www.instagram.com/mijosfoundation/", yt: "" },
              { name: "Mijo Culture", desc: "Premium streetwear rooted in heritage and hustle.", href: "https://mijoculture.com", tag: "Merch", img: "/images/shops/con_todo_sleveless_tee.png", ig: "https://www.instagram.com/mijoculture/", yt: "https://www.youtube.com/@mijoculture" },
              { name: "Chicos Tóxicos", desc: "Official merch from the crew. Wear the brotherhood.", href: "https://chicostoxico.com", tag: "Merch", img: "/images/shops/ct_tshirt.png", ig: "https://www.instagram.com/chicostoxico/", yt: "https://www.youtube.com/@Chicostoxicos" },
              { name: "Mijo Tacos", desc: "Authentic flavors. Real food. Community first.", href: "https://mijostacos.com", tag: "Food", img: "/images/shops/mijos_tacos_truck.png", ig: "https://www.instagram.com/mijos.tacos/", yt: "" },
            ].map((brand) => (
              <div
                key={brand.name}
                className="w-[280px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:w-[320px]"
              >
                <a href={brand.href} target="_blank" rel="noopener noreferrer" className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={brand.img} alt={brand.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                  </div>
                  <div className="p-5 pb-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">{brand.tag}</p>
                    <p className="mt-2 text-base font-semibold text-white group-hover:text-white/90">{brand.name}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/45">{brand.desc}</p>
                  </div>
                </a>
                <div className="px-5 pb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">Visit</span>
                    <a href={brand.ig} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
                      <Image src="/images/shops/insta-logo.jpg" alt="Instagram" width={20} height={20} className="rounded-sm" />
                    </a>
                    {brand.yt && (
                      <a href={brand.yt} target="_blank" rel="noopener noreferrer" className="transition hover:opacity-80">
                        <Image src="/images/shops/youtube_logo.png" alt="YouTube" width={20} height={20} className="rounded-sm" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hats Row */}
        <h3 className="mt-12 text-center text-2xl font-[var(--font-oswald)] font-bold uppercase tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-3xl">Mijo Culture Merch</h3>
        <div className="mt-6 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {[
              { name: "Black on Black Paisley", href: "https://mijoculture.com/products/black-on-black-paisley-sangre-azteca", img: "/mijo_hats /black_on_black.png" },
              { name: "White on Black Paisley", href: "https://mijoculture.com/products/white-on-black-paisley-sangre-azteca", img: "/mijo_hats /black_on_white.png" },
              { name: "Sangre Azteca Club Edition", href: "https://mijoculture.com/products/sangre-azteca-mijo-club-edition", img: "/mijo_hats /black_on_red.png" },
            ].map((hat) => (
              <div
                key={hat.name}
                className="w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:w-[280px]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image src={hat.img} alt={hat.name} fill className="object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-white">{hat.name}</p>
                  <p className="mt-1 text-sm text-white/50">$50</p>
                  <a href={hat.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-5 py-2 text-xs font-bold text-black transition hover:bg-[#C5A028]">
                    Buy
                  </a>
                </div>
              </div>
            ))}
            <a href="https://mijoculture.com" target="_blank" rel="noopener noreferrer" className="flex w-[240px] shrink-0 snap-start items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center transition hover:border-white/[0.15] hover:bg-white/[0.05] sm:w-[280px]">
              <div>
                <p className="text-lg font-semibold text-white">Want to see more?</p>
                <p className="mt-2 text-sm text-white/50">Visit the Mijo Culture shop →</p>
              </div>
            </a>
          </div>
        </div>

        {/* Chicos Tóxicos Merch Row */}

        <h3 className="mt-12 text-center text-2xl font-[var(--font-oswald)] font-bold uppercase tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-3xl">Chicos T&oacute;xicos Merch</h3>
        <div className="mt-6 -mx-4 px-4 sm:-mx-6 sm:px-6 md:-mx-10 md:px-10">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {[
              { name: "I Love Toxico Black Tee", price: "$34.95", href: "https://www.zumiez.com/chicos-toxicos-i-love-toxico-black-t-shirt.html", img: "/ct_shirts/black_ct_shirt.png" },
              { name: "Wish You Were My Toxica White Tee", price: "$34.95", href: "https://www.zumiez.com/chicos-toxicos-wish-you-were-my-toxica-white-t-shirt.html", img: "/ct_shirts/white_ct_shirt.png" },
              { name: "In Toxicas We Trust Brown Tee", price: "$34.95", href: "https://www.zumiez.com/chicos-toxicos-in-toxicas-we-trust-brown-t-shirt.html", img: "/ct_shirts/brown_ct_shirt.png" },
            ].map((item) => (
              <div
                key={item.name}
                className="w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] sm:w-[280px]"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image src={item.img} alt={item.name} fill className="object-cover transition duration-500 hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-white/50">{item.price}</p>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center rounded-xl bg-[#D4AF37] px-5 py-2 text-xs font-bold text-black transition hover:bg-[#C5A028]">
                    Buy
                  </a>
                </div>
              </div>
            ))}
            <a href="https://www.zumiez.com/brands/chicos-toxicos" target="_blank" rel="noopener noreferrer" className="flex w-[240px] shrink-0 snap-start items-center justify-center rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center transition hover:border-white/[0.15] hover:bg-white/[0.05] sm:w-[280px]">
              <div>
                <p className="text-lg font-semibold text-white">Want to see more?</p>
                <p className="mt-2 text-sm text-white/50">Visit the Chicos Tóxicos shop →</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* Footer */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Image src="/images/mijo_logo.png" alt="Mijo" width={32} height={32} className="rounded-lg object-contain" />
                <span className="text-white/30">×</span>
                <Image src="/images/chicos_toxicos.png" alt="Chicos Tóxicos" width={32} height={32} className="rounded-lg object-contain" />
              </div>
              <p className="mt-3 text-sm text-white/35">© 2026 Mijos Tóxicos Football × Soccer Camp</p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-10">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">Navigate</p>
                <div className="mt-3 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="text-sm text-white/45 transition hover:text-white">{link.label}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
