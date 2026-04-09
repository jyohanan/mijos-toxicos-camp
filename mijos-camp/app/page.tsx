import Link from "next/link";

const campDetails = [
  { label: "Date", value: "June 13, 2026" },
  { label: "Location", value: "TBD" },
  { label: "Ages", value: "13–18" },
  { label: "Sports", value: "Football + Soccer" },
];

const features = [
  {
    title: "Elite dual-sport experience",
    description:
      "A one-day camp built around competition, athletic development, culture, and community.",
  },
  {
    title: "Football & Soccer",
    description:
      "~500 football athletes and ~500 soccer athletes. Two sports, one unforgettable day.",
  },
  {
    title: "Scholarships available",
    description:
      "2 scholarships per sport will be awarded. Indicate your interest during registration.",
  },
];

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#details", label: "Details" },
  { href: "#highlights", label: "Highlights" },
  { href: "#register", label: "Register" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,#090909_0%,#111111_45%,#050505_100%)]">
        <div className="absolute inset-0 opacity-100">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute left-[-8%] top-[-5%] h-72 w-72 rounded-full bg-white/10 blur-3xl sm:h-96 sm:w-96" />
          <div className="absolute right-[-12%] top-[18%] h-72 w-72 rounded-full bg-white/5 blur-3xl sm:h-[28rem] sm:w-[28rem]" />
          <div className="absolute bottom-[-10%] left-[18%] h-48 w-48 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-10 md:py-24 lg:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="mb-5 inline-flex w-fit rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] sm:px-4 sm:text-xs">
                Mijo x Chicos Tóxicos
              </p>

              <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl md:text-6xl lg:text-7xl">
                Mijos Tóxicos
                <span className="mt-2 block bg-gradient-to-r from-white to-white/65 bg-clip-text text-transparent">
                  Dual Sports Camp
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base md:text-lg">
                A premium, culture-driven youth sports experience built around
                football, soccer, competition, and community.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="rounded-2xl bg-white px-6 py-3.5 text-center text-sm font-semibold text-black shadow-[0_20px_60px_rgba(255,255,255,0.12)] transition hover:scale-[1.02]"
                >
                  Register Now
                </Link>
                <a
                  href="#about"
                  className="rounded-2xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-white/[0.06]"
                >
                  Learn More
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-4 lg:max-w-none">
              <div className="rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4 sm:p-5">
                <div className="aspect-[4/5] min-h-[320px] rounded-[1.4rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_30%),linear-gradient(180deg,rgba(17,17,17,0.92),rgba(7,7,7,0.98))] p-4 sm:p-6">
                  <div className="flex h-full flex-col justify-between rounded-[1.15rem] border border-white/10 bg-black/20 p-5 sm:p-6">
                    <div>
                      <div className="mb-5 flex items-center justify-between">
                        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white/60 sm:text-[11px]">
                          Featured Event
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 sm:text-[11px]">
                          June 13, 2026
                        </span>
                      </div>
                      <h2 className="max-w-xs text-2xl font-bold leading-tight text-white sm:text-3xl">
                        Athletes. Culture. Community.
                      </h2>
                      <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
                        One day. Two sports. 1,000 athletes. This is the Mijos
                        Tóxicos Dual Sports Camp.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Format</p>
                        <p className="mt-2 text-sm font-semibold text-white/90">Dual Sport</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Athletes</p>
                        <p className="mt-2 text-sm font-semibold text-white/90">~1,000 Total</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Camp Details */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-10 md:py-16" id="details">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {campDetails.map((item) => (
            <div
              key={item.label}
              className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur sm:p-6"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">{item.label}</p>
              <p className="mt-3 text-xl font-semibold tracking-tight text-white/95">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10 md:py-10" id="about">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-white/45">About the camp</p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">
              Built for the next generation
            </h2>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/75 sm:text-base">
              The Mijos Tóxicos Dual Sports Camp is a one-day youth experience that brings football
              and soccer together in a high-energy environment. The goal is to create a memorable
              event that develops athletes while celebrating culture, discipline, and community.
            </p>
          </div>

          <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8">
            <h3 className="text-xl font-semibold">What families can expect</h3>
            <ul className="mt-5 space-y-4 text-white/75">
              <li>✦ Ages 13–18, football and soccer</li>
              <li>✦ Clear event details and mobile-friendly registration</li>
              <li>✦ Waiver and parent information collection</li>
              <li>✦ Online payment and instant confirmation</li>
              <li>✦ Scholarship opportunities available</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-10 md:py-16" id="highlights">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-white/45">Highlights</p>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl md:text-4xl">What makes this different</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8"
            >
              <div className="mb-5 h-10 w-10 rounded-2xl border border-white/10 bg-white/[0.05]" />
              <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-4 text-sm leading-6 text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Register CTA */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-10 md:py-16" id="register">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-8 text-center shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur sm:p-12">
          <p className="text-sm uppercase tracking-[0.2em] text-white/45">Ready to join?</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Secure your spot today</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Registration is open. Complete the form, sign the waiver, and pay online in minutes.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(255,255,255,0.12)] transition hover:scale-[1.02]"
          >
            Register Now
          </Link>
        </div>
      </section>

      {/* Mobile nav */}
      <div className="sticky bottom-0 z-20 border-t border-white/10 bg-[#050505]/95 px-4 py-3 backdrop-blur sm:hidden">
        <div className="flex items-center justify-between gap-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-xs font-medium text-white/80 transition hover:bg-white/[0.06]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-white/50 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="text-center md:text-left">© 2026 Mijos Tóxicos Dual Sports Camp</p>
          <div className="hidden gap-6 sm:flex">
            <a href="#about" className="transition hover:text-white">About</a>
            <a href="#details" className="transition hover:text-white">Camp Details</a>
            <a href="#highlights" className="transition hover:text-white">Highlights</a>
            <a href="#register" className="transition hover:text-white">Register</a>
          </div>
        </div>
      </section>
    </main>
  );
}
