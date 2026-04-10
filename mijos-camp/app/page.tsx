import Image from "next/image";
import Link from "next/link";

const campDetails = [
  { label: "Date", value: "June 13, 2026" },
  { label: "Location", value: "TBD" },
  { label: "Ages", value: "13–18" },
  { label: "Sports", value: "Football + Soccer" },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#details", label: "Details" },
  { href: "#gallery", label: "Gallery" },
  { href: "#register", label: "Register" },
];

const galleryImages = [
  { src: "/group_picture_2025.jpeg", alt: "Group photo 2025" },
  { src: "/kids_huddle_2025.jpeg", alt: "Kids huddle 2025" },
  { src: "/kids_lined_up_2025.jpeg", alt: "Kids lined up 2025" },
  { src: "/hands_in_2025.jpeg", alt: "Hands in 2025" },
  { src: "/will_speaking_2025.jpeg", alt: "Will speaking 2025" },
];

export default function HomePage() {
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
          <Link
            href="/register"
            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
          >
            Register Now
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden pt-16">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/kid_stance_2025.jpeg"
            alt="Camp hero"
            fill
            className="object-cover object-[center_20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-[#080808]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 md:px-10 md:pb-28">
          {/* Co-brand logos */}
          <div className="mb-6 flex items-center gap-3">
            <Image src="/mijo_logo.png" alt="Mijo" width={44} height={44} className="rounded-xl object-contain" />
            <span className="text-white/40">×</span>
            <Image src="/chicos_toxicos.png" alt="Chicos Tóxicos" width={44} height={44} className="rounded-xl object-contain" />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
            June 13, 2026 · Ages 13–18
          </p>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-8xl">
            Mijos
            <br />
            Tóxicos
            <br />
            <span className="text-white/40">Dual Sports</span>
            <br />
            Camp
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-white/65 sm:text-base">
            Football. Soccer. Culture. Community. One day. 1,000 athletes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.15)] transition hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              Register Now — $100
            </Link>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/[0.06] bg-[#0d0d0d]" id="details">
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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:px-10 md:py-28" id="about">
        <div className="max-w-2xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">About the camp</p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Built for the
              <br />
              next generation
            </h2>
            <p className="mt-6 text-sm leading-8 text-white/60 sm:text-base">
              The Mijos Tóxicos Dual Sports Camp is a one-day youth experience that brings football
              and soccer together in a high-energy environment. Built around competition, athletic
              development, culture, and community.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "~500 football athletes + ~500 soccer athletes",
                "Ages 13–18, all skill levels welcome",
                "2 scholarships awarded per sport",
                "Online registration, waiver & payment",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                  {item}
                </li>
              ))}
            </ul>
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
              <div
                key={img.src}
                className={`relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 aspect-[16/9] md:col-span-1 md:aspect-[4/5]" : "aspect-square"}`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover transition duration-500 hover:scale-105" />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Register CTA */}
      <section className="px-4 py-16 sm:px-6 md:px-10 md:py-24" id="register">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-[#111]">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image src="/kids_lined_up_2025.jpeg" alt="Athletes" fill className="object-cover object-center opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111] via-[#111]/90 to-[#111]/70" />
            </div>

            <div className="relative px-8 py-16 sm:px-12 md:py-20 lg:px-16">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Ready to compete?</p>
                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
                  Secure your
                  <br />
                  spot today
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/60 sm:text-base">
                  Registration is $100. Complete the form, sign the waiver, and pay online in minutes. Spots are limited.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(255,255,255,0.12)] transition hover:scale-[1.02]"
                  >
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
            <a
              key={link.href}
              href={link.href}
              className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-2 py-2 text-center text-[11px] font-medium text-white/70 transition hover:bg-white/[0.06]"
            >
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
