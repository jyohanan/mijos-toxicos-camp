import Image from "next/image";
import Link from "next/link";

import CountdownTimer from "./components/CountdownTimer";
import SponsorMarquee from "./components/SponsorMarquee";
import { getSettings } from "@/lib/settings";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#details", label: "Details" },
  { href: "#gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "#register", label: "Register" },
];

const galleryImages = [
  { src: "/group_picture_2025.jpeg", alt: "Group photo 2025" },
  { src: "/kids_huddle_2025.jpeg", alt: "Kids huddle 2025" },
  { src: "/kids_lined_up_2025.jpeg", alt: "Kids lined up 2025" },
  { src: "/hands_in_2025.jpeg", alt: "Hands in 2025" },
  { src: "/will_speaking_2025.jpeg", alt: "Will speaking 2025" },
];

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSettings();

  const campDate = settings.camp_date || "June 13, 2026";
  const campLocation = settings.camp_location || "TBD";
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
            <Image src="/mijo_logo.png" alt="Mijo Logo" width={32} height={32} className="rounded-lg object-contain" />
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

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden pt-16">
        <div className="absolute inset-0">
          <Image src="/kid_stance_2025.jpeg" alt="Camp hero" fill className="object-cover object-[center_20%]" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-[#080808]/30 to-transparent" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 md:px-10 md:pb-28">
          <div className="mb-8 flex items-center gap-6">
            <Image src="/mijo_logo.png" alt="Mijo" width={100} height={100} className="rounded-2xl object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
            <span className="text-3xl text-white/30">×</span>
            <Image src="/chicos_toxicos.png" alt="Chicos Tóxicos" width={100} height={100} className="rounded-2xl object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]" />
          </div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">{campDate} · Ages 13–18</p>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
            Mijos<br />Tóxicos<br /><span className="text-white/40">Dual Sports</span><br />Camp
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
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
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/[0.06] bg-[#0d0d0d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 divide-x divide-white/[0.06] lg:grid-cols-4">
            {campDetails.map((item) => (
              <div key={item.label} className="px-6 py-8 sm:px-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">{item.label}</p>
                <p className="mt-2 text-lg font-bold tracking-tight text-white sm:text-xl">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-24" id="about">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">About the camp</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Built for the<br />next generation
            </h2>
            <p className="mt-6 text-sm leading-8 text-white/60 sm:text-base">
              The Mijos Tóxicos Dual Sports Camp is a one-day youth experience that brings football
              and soccer together in a high-energy environment. Built around competition, athletic
              development, culture, and community.
            </p>
            <p className="mt-4 text-sm leading-8 text-white/60 sm:text-base">
              Founded by NFL offensive lineman Will Hernandez of the Arizona Cardinals through the
              Mijo Things Foundation, and co-hosted with Chicos Tóxicos — this camp gives young
              athletes something most camps can&apos;t: direct access to professional athletes and
              influencers who&apos;ve been where they want to go.
            </p>
            <p className="mt-4 text-sm leading-8 text-white/60 sm:text-base">
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
                  <p className="text-sm font-semibold text-white sm:text-base">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-7 text-white/45">{item.desc}</p>
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
          <h2 className="mt-4 text-center text-3xl font-black tracking-tight sm:text-4xl">The Mijo Experience</h2>
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
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10 md:py-24" id="details">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Camp Details</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">What to expect</h2>

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
                  <p className="text-sm font-semibold text-white sm:text-base">{item.event}</p>
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
                  <p className="text-sm font-medium text-white/80">{entry.item}</p>
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
                  <p className="text-sm font-medium text-white/80">{entry.item}</p>
                  <p className="text-xs text-white/35">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">Scholarships</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
              1 scholarship<br />per sport
            </h2>
            <p className="mt-6 text-sm leading-8 text-white/60 sm:text-base">
              We believe every athlete deserves a shot regardless of financial situation. That&apos;s why we&apos;re awarding 1 full scholarship per sport — 2 total — covering the registration fee completely.
            </p>
            <p className="mt-4 text-sm leading-8 text-white/60 sm:text-base">
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
              { num: "01", title: "Football Scholarship", desc: "1 spot available. Full registration fee covered for one football athlete." },
              { num: "02", title: "Soccer Scholarship", desc: "1 spot available. Full registration fee covered for one soccer athlete." },
              { num: "03", title: "How to apply", desc: "Check the scholarship box on the registration form. No separate application needed. Recipients notified before the event." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-5 border-b border-white/[0.06] py-6 first:pt-0 last:border-0 last:pb-0">
                <span className="mt-0.5 text-sm font-bold tabular-nums text-white/20">{item.num}</span>
                <div>
                  <p className="text-sm font-semibold text-white sm:text-base">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-7 text-white/45">{item.desc}</p>
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
          <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">2025 Highlights</h2>
        </div>
        <div className="mx-auto mt-8 max-w-7xl">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {galleryImages.map((img, i) => (
              <div key={img.src} className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9] md:col-span-1 md:aspect-[4/5]" : "aspect-square"}`}>
                <Image src={img.src} alt={img.alt} fill className="object-cover transition duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <SponsorMarquee />

      {/* Register CTA */}
      <section className="px-4 py-16 sm:px-6 md:px-10 md:py-24" id="register">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#111]">
            <div className="absolute inset-0">
              <Image src="/kids_lined_up_2025.jpeg" alt="Athletes" fill className="object-cover object-center opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/90 to-[#111]/70" />
            </div>
            <div className="relative px-8 py-16 sm:px-12 md:py-20 lg:px-16">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Ready to compete?</p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  Secure your<br />spot today
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base">
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

      {/* Footer */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-white/35 md:flex-row md:items-center md:justify-between md:px-10">
          <div className="flex items-center gap-3">
            <Image src="/mijo_logo.png" alt="Mijo" width={24} height={24} className="rounded-md object-contain opacity-60" />
            <p>© 2026 Mijos Tóxicos Dual Sports Camp</p>
          </div>
          <div className="hidden gap-6 sm:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">{link.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
