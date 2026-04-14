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
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#080808]/90 backdrop-blur-xl">
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
          <Link href="/register" className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90">
            Register Now
          </Link>
        </div>
      </nav>

      {/* Hero — Image */}
      <section className="relative h-[60vh] overflow-hidden pt-16 sm:h-[70vh]">
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
            <h1 className="mt-4 font-[var(--font-playfair)] text-5xl font-black leading-[0.92] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
              Mijos<br />Tóxicos<br /><span className="text-white/40">Football × Soccer</span><br />Camp
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-white/65 sm:text-xl md:text-2xl">
              Football. Soccer. Culture. Community. One day. 1,000 athletes.
            </p>
            <div className="mt-8">
              <CountdownTimer />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="inline-flex items-center justify-center rounded-2xl bg-black px-7 py-4 text-sm font-bold text-white shadow-[0_0_40px_rgba(0,0,0,0.3)] transition hover:scale-[1.02] hover:bg-black/90">
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

      {/* Who's Behind the Camp */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <ImageCarousel
            images={[
              { src: "/ct_boys_x_mijos.png", alt: "Chicos Tóxicos and Mijo Foundation" },
              { src: "/will_intro.jpg", alt: "Will Hernandez introduction" },
              { src: "/ct_boys_football_field.png", alt: "Chicos Tóxicos on the football field" },
              { src: "/mijos_group_photos.jpeg", alt: "Mijos group photo" },
              { src: "/will_mx.jpg", alt: "Will Hernandez" },
              { src: "/ct_plane.jpg", alt: "Chicos Tóxicos traveling" },
              { src: "/images/mijos_bench_pic.png", alt: "Mijos on the bench" },
            ]}
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Who&apos;s behind the camp</p>
            <h2 className="mt-4 text-3xl font-[var(--font-playfair)] font-black leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">
              Mijo Foundation<br />× Chicos Tóxicos
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
            <p className="mt-4 text-base leading-8 text-white/60 sm:text-lg">
              Chicos Tóxicos is a brotherhood built on the grind — a crew of athletes and creators
              who push each other through training, travel, and life. They bring that same energy
              to this camp, showing young athletes what it looks like to compete hard, stay tight,
              and build something real together.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:px-10 md:py-32" id="about">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">About the camp</p>
            <h2 className="mt-4 text-3xl font-[var(--font-playfair)] font-black leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
              Built for the<br />next generation
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
              The Mijos Tóxicos Dual Sports Camp is a one-day youth experience that brings football
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
              { num: "03", title: "Scholarships available", desc: "1 full scholarship per sport. We believe every athlete deserves a shot regardless of financial situation." },
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

      {/* Promo Video */}
      <section className="px-4 py-16 sm:px-6 md:px-10 md:py-20">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/35">See it in action</p>
          <h2 className="mt-4 text-center text-3xl font-[var(--font-playfair)] font-black tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">The Mijo Experience</h2>
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

      {/* Camp Details */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-32" id="details">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Camp Details</p>
        <h2 className="mt-4 text-3xl font-[var(--font-playfair)] font-black tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">What to expect</h2>

        {/* Schedule — Timeline */}
        <div className="relative mt-14">
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-white/20 via-white/10 to-transparent sm:left-[11px]" />

          <div className="mb-6 flex items-center gap-4">
            <div className="relative z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-white/30 bg-[#080808] sm:h-[23px] sm:w-[23px]">
              <div className="h-[5px] w-[5px] rounded-full bg-white sm:h-[7px] sm:w-[7px]" />
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">Schedule</p>
          </div>

          <div className="ml-[30px] sm:ml-[46px]">
            {[
              { event: "Check-in", time: "7:30 AM", desc: "Arrive, get your camp t-shirt, and meet your group" },
              { event: "Opening ceremony", time: "8:30 AM", desc: "Welcome address and camp overview" },
              { event: "Football sessions", time: "9:00 AM", desc: "Position drills, technique work, and competitive reps" },
              { event: "Soccer sessions", time: "9:00 AM", desc: "Skills training, small-sided games, and tactical sessions" },
              { event: "Lunch break", time: "12:00 PM", desc: "Lunch provided for all registered athletes" },
              { event: "Competitions", time: "1:00 PM", desc: "Head-to-head matchups and showcase games" },
              { event: "Awards & closing", time: "4:00 PM", desc: "MVP awards, scholarship announcements, and group photo" },
              { event: "Event ends", time: "5:00 PM", desc: "Pickup and departure" },
            ].map((item, i) => (
              <div key={item.event + i} className="flex items-start gap-5 border-b border-white/[0.04] py-5 last:border-0">
                <p className="w-[72px] shrink-0 text-sm font-semibold tabular-nums text-white/80 sm:w-[88px] sm:text-base">{item.time}</p>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-white sm:text-lg">{item.event}</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/40 sm:text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
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

      {/* Scholarship */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">Scholarships</p>
            <h2 className="mt-4 text-3xl font-[var(--font-playfair)] font-black leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
              1 scholarship<br />per sport
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
              We believe every athlete deserves a shot regardless of financial situation. That&apos;s why we&apos;re awarding 1 full scholarship per sport — 2 total — covering the registration fee completely.
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

      {/* Gallery */}
      <section className="px-4 py-16 sm:px-6 md:px-10 md:py-20" id="gallery">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">From the field</p>
          <h2 className="mt-4 text-3xl font-[var(--font-playfair)] font-black tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl">2025 Highlights</h2>
        </div>
        <div className="mx-auto mt-8 max-w-7xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {galleryImages.map((img, i) => (
              <div key={img.src} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9] md:col-span-1 md:aspect-[4/5]" : "aspect-square"}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent sm:from-black/20 sm:via-transparent sm:to-transparent sm:transition sm:duration-500 sm:group-hover:from-black/60 sm:group-hover:via-black/20" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:translate-y-full sm:transition sm:duration-500 sm:group-hover:translate-y-0">
                  <p className="text-sm font-medium text-white">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <SponsorMarquee />

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
                <h2 className="mt-4 text-3xl font-[var(--font-playfair)] font-black leading-tight tracking-tight bg-gradient-to-r from-green-500 via-white to-red-500 bg-clip-text text-transparent sm:text-4xl md:text-5xl">
                  Secure your<br />spot today
                </h2>
                <p className="mt-5 text-base leading-8 text-white/60 sm:text-lg">
                  Registration is ${campPrice}. Complete the form, sign the waiver, and pay online in minutes. Spots are limited.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link href="/register" className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition hover:scale-[1.02]">
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

      {/* Connect / Learn More */}
      <section className="border-y border-white/[0.06] bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-10">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">Learn more</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { label: "Mijo Foundation", href: "https://www.mijothingsfoundation.com/" },
              { label: "Mijo Culture", href: "https://mijoculture.com/" },
              { label: "Mijo Tacos", href: "https://mijostacos.com/" },
              { label: "Chicos Tóxicos", href: "https://www.loschicostoxicos.com/" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/[0.08] hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-4">
            <a href="https://www.instagram.com/mijosfoundation/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:bg-white/[0.08] hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.instagram.com/chicostoxico/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:bg-white/[0.08] hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://www.youtube.com/@Chicostoxicos" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:bg-white/[0.08] hover:text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>
      </section>

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
              <p className="mt-3 text-sm text-white/35">© 2026 Mijos Tóxicos Dual Sports Camp</p>
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
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30">Follow</p>
                <div className="mt-3 flex gap-3">
                  <a href="https://www.instagram.com/mijosfoundation/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:bg-white/[0.08] hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a href="https://www.instagram.com/chicostoxico/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:bg-white/[0.08] hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a href="https://www.youtube.com/@Chicostoxicos" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-white/50 transition hover:bg-white/[0.08] hover:text-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
