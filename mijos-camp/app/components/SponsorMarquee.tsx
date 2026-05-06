const sponsors = [
  { src: "/sponsors/srs-logo.svg", alt: "Spine Rehab Specialist" },
  { src: "/sponsors/mijo.png", alt: "Mijo Things Shop" },
  { src: "/sponsors/915-tours.webp", alt: "915 Tours" },
  { src: "/sponsors/bella-logo.webp", alt: "Bella Paloma Medspa & Wellness" },
  { src: "/sponsors/sprouts-logo.webp", alt: "Sprouts" },
];

export default function SponsorMarquee() {
  return (
    <section className="border-y border-white/[0.06] bg-[#0a0a0a] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
          Proudly supported by
        </p>
      </div>
      <div className="relative mt-8 overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        {/* Scrolling track */}
        <div className="flex w-max animate-marquee items-center gap-10">
          {[...sponsors, ...sponsors, ...sponsors].map((s, i) => (
            <div
              key={`${s.alt}-${i}`}
              className="flex h-12 w-32 shrink-0 items-center justify-center sm:w-40"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                className="max-h-10 max-w-full object-contain opacity-60 transition hover:opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
