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

  const campDate = settings.camp_date || "June 13, 2026";
  const campLocation = settings.camp_location || "LA";
  const campPrice = settings.registration_price || "100";

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
              Football. Soccer. Culture. Community. One day. 1,000 athletes.
            </p>
            <div className="mt-8">
              <CountdownTimer />
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
              { src: "/mijos_group_photos.jpeg", alt: "Mijos group photo" },
              { src: "/images/mijos_bench_pic.png", alt: "Mijos on the bench" },
            ]}
          />
          <div>
            <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">
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
            <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">About the camp</p>
            <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
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
              { num: "03", title: "Scholarships available", desc: "1 scholarship per sport. We believe every athlete deserves a shot regardless of financial situation." },
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
              src="https://www.youtube.com/embed/9pb8xMMZAWw"
              title="Mijos Tóxicos Camp 2025 Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="aspect-video w-full"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10"><div className="divider-mx" /></div>

      {/* Camp Details */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-32" id="details">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Camp Details</p>
        <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">What to expect</h2>

        {/* Schedule — Dual Sport Itinerary */}
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Soccer */}
          <div>
            <div className="mb-4 rounded-xl border border-white/[0.1] bg-white/[0.04] px-5 py-4 backdrop-blur-xl" style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 0 40px rgba(255,255,255,0.02)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚽</span>
                  <h3 className="text-lg font-[var(--font-oswald)] font-bold uppercase tracking-tight text-white">Soccer</h3>
                </div>
                <span className="text-xs font-semibold text-white/40">8:00 AM – 11:00 AM</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {[
                { time: "8:00", event: "Check In (60 Min)", highlight: false },
                { time: "9:00", event: "Introduction (10 Min)", highlight: false },
                { time: "9:10", event: "Dynamic Warm Up (10 Min)", highlight: false },
                { time: "9:20", event: "Break (5 Min)", highlight: false },
                { time: "9:25", event: "Indy (15 Min)", highlight: false },
                { time: "9:40", event: "Break — Speaking Engagement + Seminar", highlight: true },
                { time: "9:45", event: "Competition Station (10 Min)", highlight: false },
                { time: "9:55", event: "Break — Speaking Engagement + Seminar", highlight: true },
                { time: "10:00", event: "Competition Station (10 Min)", highlight: false },
                { time: "10:10", event: "Break — Speaking Engagement + Seminar", highlight: true },
                { time: "10:15", event: "Influencer Athlete Competition Station (10 Min)", highlight: "blue" },
                { time: "10:25", event: "Parent Competition Station (5 Min)", highlight: false },
                { time: "10:30", event: "Break — Speaking Engagement + Seminar", highlight: true },
                { time: "10:35", event: "Competition Station (10 Min)", highlight: false },
                { time: "10:45", event: "Break (5 Min)", highlight: false },
                { time: "10:50", event: "WHOLE GROUP Competition (10 Min)", highlight: false },
                { time: "11:00", event: "Break — Speaking Engagement + Seminar", highlight: true },
              ].map((item, i) => (
                <div
                  key={`soccer-${i}`}
                  className={`flex items-center gap-4 border-b border-white/[0.04] px-4 py-3 last:border-0 transition hover:bg-white/[0.03] ${
                    item.highlight === "blue" ? "bg-blue-500/10" : item.highlight ? "bg-red-500/10" : ""
                  }`}
                >
                  <span className="w-[52px] shrink-0 text-xs font-semibold tabular-nums text-[#D4AF37]">{item.time}</span>
                  <span className={`text-sm ${item.highlight === "blue" ? "font-semibold text-blue-400" : item.highlight ? "font-semibold text-red-400" : "text-white/70"}`}>{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Football */}
          <div>
            <div className="mb-4 rounded-xl border border-white/[0.1] bg-white/[0.04] px-5 py-4 backdrop-blur-xl" style={{ boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 0 40px rgba(255,255,255,0.02)" }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🏈</span>
                  <h3 className="text-lg font-[var(--font-oswald)] font-bold uppercase tracking-tight text-white">Football</h3>
                </div>
                <span className="text-xs font-semibold text-white/40">11:00 AM – 2:00 PM</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {[
                { time: "11:00", event: "Check In (60 Min)", highlight: false },
                { time: "12:00", event: "Introduction (10 Min)", highlight: false },
                { time: "12:10", event: "Dynamic Warm Up (10 Min)", highlight: false },
                { time: "12:20", event: "Break (5 Min)", highlight: false },
                { time: "12:25", event: "Indy (15 Min)", highlight: false },
                { time: "12:40", event: "Break — Speaking Engagement + Seminar", highlight: true },
                { time: "12:45", event: "Competition Station (10 Min)", highlight: false },
                { time: "12:55", event: "Break — Speaking Engagement + Seminar", highlight: true },
                { time: "1:00", event: "Competition Station (10 Min)", highlight: false },
                { time: "1:10", event: "Break — Speaking Engagement + Seminar", highlight: true },
                { time: "1:15", event: "Influencer Athlete Competition Station (10 Min)", highlight: "blue" },
                { time: "1:25", event: "Parent Competition Station (5 Min)", highlight: false },
                { time: "1:30", event: "Break — Speaking Engagement + Seminar", highlight: true },
                { time: "1:35", event: "Competition Station (10 Min)", highlight: false },
                { time: "1:45", event: "Break (5 Min)", highlight: false },
                { time: "1:50", event: "WHOLE GROUP Competition (10 Min)", highlight: false },
                { time: "2:00", event: "Break — Speaking Engagement + Seminar", highlight: true },
              ].map((item, i) => (
                <div
                  key={`football-${i}`}
                  className={`flex items-center gap-4 border-b border-white/[0.04] px-4 py-3 last:border-0 transition hover:bg-white/[0.03] ${
                    item.highlight === "blue" ? "bg-blue-500/10" : item.highlight ? "bg-red-500/10" : ""
                  }`}
                >
                  <span className="w-[52px] shrink-0 text-xs font-semibold tabular-nums text-[#D4AF37]">{item.time}</span>
                  <span className={`text-sm ${item.highlight === "blue" ? "font-semibold text-blue-400" : item.highlight ? "font-semibold text-red-400" : "text-white/70"}`}>{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-red-500/30" />
            <span className="text-xs text-white/40">Speaking Engagement + Seminar</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-blue-500/30" />
            <span className="text-xs text-white/40">Influencer Athlete Competition</span>
          </div>
        </div>

        {/* What to Bring — Stacked rows */}
        <div className="mt-16 border-t border-white/[0.06] pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">What to bring</p>
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
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">Included with registration</p>
          <div className="mt-6 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { item: "Camp t-shirt", note: "Custom event tee in your size" },
              { item: "Lunch", note: "Full meal provided on-site" },
              { item: "Coaching & instruction", note: "From experienced coaches and athletes" },
              { item: "Competition participation", note: "Showcase games and head-to-head matchups" },
              { item: "Scholarship consideration", note: "Opt in during registration" },
              { item: "All-day event access", note: "Full camp experience from check-in to close" },
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
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">Scholarships</p>
            <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
              1 scholarship<br />per sport
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
              We believe every athlete deserves a shot regardless of financial situation. That&apos;s why we&apos;re awarding 1 scholarship per sport — 2 total.
            </p>
            <p className="mt-4 text-base leading-8 text-white/60 sm:text-lg">
              To be considered, simply check the scholarship box during registration. Recipients will be selected and notified before the event.
            </p>
            <div className="mt-8">
              <Link href="/register" className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:scale-[1.02]">
                Apply During Registration
              </Link>
            </div>
          </div>
          <div className="space-y-0">
            {[
              { num: "01", title: "Football Scholarship", desc: "1 spot available for one football athlete." },
              { num: "02", title: "Soccer Scholarship", desc: "1 spot available for one soccer athlete." },
              { num: "03", title: "How to apply", desc: "Check the scholarship box on the registration form. No separate application needed. Recipients notified before the event." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-5 border-b border-white/[0.06] py-6 first:pt-0 last:border-0 last:pb-0">
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

      {/* Gallery */}
      <section className="px-4 py-16 sm:px-6 md:px-10 md:py-20" id="gallery">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">From the field</p>
          <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">2025 Highlights</h2>
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
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Ready to compete?</p>
                <h2 className="mt-4 text-3xl font-[var(--font-oswald)] font-bold uppercase leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
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
