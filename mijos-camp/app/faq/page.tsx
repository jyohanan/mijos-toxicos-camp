"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    q: "What is the Mijos Tóxicos Dual Sports Camp?",
    a: "It's a one-day youth sports camp that brings football and soccer together in a high-energy environment. The camp is built around competition, athletic development, culture, and community — open to athletes ages 13–18.",
  },
  {
    q: "When and where is the camp?",
    a: "June 13, 2026. The location is TBD and will be announced soon. All registered families will be notified as soon as the venue is confirmed.",
  },
  {
    q: "How much does registration cost?",
    a: "Registration is $100 per athlete. This includes a camp t-shirt, lunch, coaching and instruction, competition participation, and all-day event access.",
  },
  {
    q: "What sports are offered?",
    a: "Football and soccer. Each athlete selects one sport during registration. We expect roughly 500 athletes per sport.",
  },
  {
    q: "What ages are eligible?",
    a: "Athletes must be between 13 and 18 years old to participate.",
  },
  {
    q: "Can I register more than one child?",
    a: "Yes — just complete a separate registration for each athlete. Each registration requires its own payment.",
  },
  {
    q: "What should my athlete bring?",
    a: "Athletic cleats (football or soccer), gym shoes, a water bottle, sunscreen, and snacks. Lunch is provided, but extra snacks are recommended for a full day of activity.",
  },
  {
    q: "What is included with registration?",
    a: "Every registered athlete receives a camp t-shirt, lunch, professional coaching and instruction, competition participation, scholarship consideration (if opted in), and full event access from check-in to close.",
  },
  {
    q: "Are scholarships available?",
    a: "Yes — we're awarding 1 full scholarship per sport (2 total). To be considered, simply check the scholarship box during registration. No separate application is needed. Recipients will be notified before the event.",
  },
  {
    q: "What is the refund policy?",
    a: "All registration fees are non-refundable and non-transferable. If the camp is fully cancelled by the organizers, a full refund will be issued to the original payment method.",
  },
  {
    q: "Is there a waiver?",
    a: "Yes — a parent or legal guardian must accept the liability waiver, medical treatment consent, and photo/video release during registration before proceeding to payment.",
  },
  {
    q: "What time does the camp start and end?",
    a: "Check-in begins at 7:30 AM. The opening ceremony is at 8:30 AM. The event wraps up at 5:00 PM.",
  },
  {
    q: "How do I contact the organizers?",
    a: "For questions, reach out to us on Instagram or email us directly. Contact details will be shared with registered families.",
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-6 text-left transition"
      >
        <span className="text-sm font-semibold text-white sm:text-base">{q}</span>
        <span
          className={`shrink-0 text-white/40 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-sm leading-7 text-white/50">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] bg-[#080808]/90 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white">
            <Image src="/mijo_logo.png" alt="Mijo" width={24} height={24} className="rounded-md object-contain" />
            <span>← Back to home</span>
          </a>
          <Link href="/register" className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90">
            Register Now
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">Support</p>
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-sm leading-7 text-white/50">
          Everything you need to know about the Mijos Tóxicos Dual Sports Camp.
        </p>

        <div className="mt-12">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
          <p className="text-sm font-semibold text-white">Still have questions?</p>
          <p className="mt-2 text-sm text-white/45">
            Reach out to us on social media or email. We&apos;re happy to help.
          </p>
        </div>
      </div>
    </main>
  );
}
