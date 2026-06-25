"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const ACCESS_CODE = "MINERS97";
const STORAGE_KEY = "mijos_access_granted";

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const [granted, setGranted] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setGranted(true);
    }
    setChecking(false);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (code.trim().toUpperCase() === ACCESS_CODE) {
      localStorage.setItem(STORAGE_KEY, "true");
      setGranted(true);
    } else {
      setError("Invalid code. Please try again.");
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080808]">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    );
  }

  if (granted) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#080808] px-4">
      <div className="w-full max-w-sm text-center">
        <div className="flex items-center justify-center gap-3">
          <Image src="/images/mijo_logo.png" alt="Mijo" width={48} height={48} className="rounded-xl object-contain" />
          <span className="text-xl text-white/30">×</span>
          <Image src="/images/chicos_toxicos.png" alt="Chicos Tóxicos" width={48} height={48} className="rounded-xl object-contain" />
        </div>
        <h1 className="mt-6 text-2xl font-black tracking-tight text-white">Access Required</h1>
        <p className="mt-2 text-sm text-white/50">Enter the access code to view this site.</p>

        <form onSubmit={handleSubmit} className="mt-8">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            autoFocus
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-4 text-center text-lg font-semibold uppercase tracking-widest text-white placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] transition"
          />
          {error && (
            <p className="mt-3 text-sm text-red-400">{error}</p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-[#D4AF37] px-5 py-4 text-sm font-bold text-black transition hover:bg-[#C5A028]"
          >
            Enter
          </button>
        </form>

        <p className="mt-6 text-xs text-white/20">Mijos Tóxicos Football × Soccer Camp</p>
      </div>
    </div>
  );
}
