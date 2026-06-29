import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-3xl">
          ✓
        </div>
        <h1 className="text-3xl font-black tracking-tight">You&apos;re in!</h1>
        <p className="mt-3 text-white/60">
          Registration confirmed for the Mijos Tóxicos Football × Soccer Camp · July 11, 2026
        </p>
        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6 text-sm text-white/70 text-left space-y-2">
          <p>✦ A confirmation email has been sent to your inbox.</p>
          <p>✦ Check-in details and location will be sent closer to the event.</p>
          <p>✦ Questions? Reach out on Instagram.</p>
        </div>
        <Link
          href="/"
          className="mt-8 inline-block rounded-2xl border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
