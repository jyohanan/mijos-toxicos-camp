"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface Registration {
  id: string;
  created_at: string;
  athlete_first_name: string;
  athlete_last_name: string;
  athlete_age: number;
  gender: string;
  sport: string;
  position: string | null;
  school_name: string;
  grade: string;
  shirt_size: string;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  emergency_name: string;
  emergency_phone: string;
  medical_notes: string | null;
  scholarship_interest: boolean;
  payment_status: string;
  amount_paid: number | null;
}

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code" | "dashboard">("email");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sportFilter, setSportFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (sportFilter) params.set("sport", sportFilter);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/admin/registrations?${params}`, {
        headers: { "x-admin-email": email },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setRegistrations(data.registrations || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [email, sportFilter, statusFilter]);

  useEffect(() => {
    if (step === "dashboard") fetchRegistrations();
  }, [step, sportFilter, statusFilter, fetchRegistrations]);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/admin/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send code");
      setStep("code");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/admin/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid code");
      setStep("dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  async function handleExport() {
    const res = await fetch("/api/admin/export", {
      headers: { "x-admin-email": email },
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ── Email step ──
  if (step === "email") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <form onSubmit={handleSendCode} className="w-full max-w-sm px-4">
          <div className="flex justify-center mb-8">
            <Image src="/mijo_logo.png" alt="Mijo" width={48} height={48} className="rounded-xl" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-center">Admin Access</h1>
          <p className="mt-2 text-sm text-white/40 text-center">Enter your admin email to receive an access code.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@email.com"
            required
            className="mt-6 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/25"
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={sending}
            className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-white/90 disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Code"}
          </button>
        </form>
      </main>
    );
  }

  // ── Code verification step ──
  if (step === "code") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <form onSubmit={handleVerifyCode} className="w-full max-w-sm px-4">
          <div className="flex justify-center mb-8">
            <Image src="/mijo_logo.png" alt="Mijo" width={48} height={48} className="rounded-xl" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-center">Enter Code</h1>
          <p className="mt-2 text-sm text-white/40 text-center">We sent a 6-digit code to {email}</p>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="000000"
            required
            maxLength={6}
            className="mt-6 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-center text-2xl font-bold tracking-[0.3em] text-white placeholder-white/20 outline-none focus:border-white/25"
          />
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={sending || code.length !== 6}
            className="mt-4 w-full rounded-xl bg-white px-4 py-3 text-sm font-bold text-black transition hover:bg-white/90 disabled:opacity-50"
          >
            {sending ? "Verifying..." : "Verify"}
          </button>
          <button
            type="button"
            onClick={() => { setStep("email"); setCode(""); setError(""); }}
            className="mt-3 w-full text-center text-sm text-white/40 transition hover:text-white"
          >
            Use a different email
          </button>
        </form>
      </main>
    );
  }

  // ── Dashboard ──
  const paidCount = registrations.filter((r) => r.payment_status === "paid").length;
  const pendingCount = registrations.filter((r) => r.payment_status === "pending").length;
  const footballCount = registrations.filter((r) => r.sport === "football").length;
  const soccerCount = registrations.filter((r) => r.sport === "soccer").length;

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] bg-[#080808]/90 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white">
            <Image src="/mijo_logo.png" alt="Mijo" width={24} height={24} className="rounded-md object-contain" />
            <span>← Back to site</span>
          </a>
          <span className="text-xs text-white/30">Admin Dashboard</span>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Registrations</h1>
            <p className="mt-1 text-sm text-white/40">{registrations.length} total registrations</p>
          </div>
          <button
            onClick={handleExport}
            className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Paid", value: paidCount, color: "text-green-400" },
            { label: "Pending", value: pendingCount, color: "text-yellow-400" },
            { label: "Football", value: footballCount, color: "text-white" },
            { label: "Soccer", value: soccerCount, color: "text-white" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/[0.08] bg-[#0d0d0d] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35">{stat.label}</p>
              <p className={`mt-1 text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3">
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none"
          >
            <option value="">All Sports</option>
            <option value="football">Football</option>
            <option value="soccer">Soccer</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm text-white outline-none"
          >
            <option value="">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{error}</p>
        )}

        {/* Table */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/[0.08]">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-[#0d0d0d]">
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">Athlete</th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">Sport</th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">Age</th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">School</th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">Parent</th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">Status</th>
                <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-white/40">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/30">Loading...</td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-white/30">No registrations found.</td>
                </tr>
              ) : (
                registrations.map((r) => (
                  <tr key={r.id} className="border-b border-white/[0.04] transition hover:bg-white/[0.02]">
                    <td className="px-4 py-3 font-medium text-white">
                      {r.athlete_first_name} {r.athlete_last_name}
                      {r.scholarship_interest && <span className="ml-2 text-[10px] text-yellow-400">🎓</span>}
                    </td>
                    <td className="px-4 py-3 text-white/60 capitalize">{r.sport}</td>
                    <td className="px-4 py-3 text-white/60">{r.athlete_age}</td>
                    <td className="px-4 py-3 text-white/60">{r.school_name}</td>
                    <td className="px-4 py-3 text-white/60">{r.parent_name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          r.payment_status === "paid"
                            ? "bg-green-500/10 text-green-400"
                            : r.payment_status === "pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {r.payment_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white/40">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
