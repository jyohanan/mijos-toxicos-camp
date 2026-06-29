"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RegistrationFormData } from "@/lib/types";

const STEPS = ["Athlete", "Parent & Emergency", "Medical & Other", "Waiver"];

const defaultForm: RegistrationFormData = {
  athlete_first_name: "",
  athlete_last_name: "",
  athlete_age: "",
  athlete_dob: "",
  gender: "",
  sport: "football",
  position: "",
  school_name: "",
  grade: "",
  shirt_size: "",
  parent_name: "",
  parent_email: "",
  parent_phone: "",
  emergency_name: "",
  emergency_phone: "",
  medical_notes: "",
  insurance_provider: "",
  social_handle: "",
  heard_from: "",
  scholarship_interest: false,
  waiver_accepted: false,
  waiver_photo_accepted: false,
  waiver_adult_accepted: false,
};

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegistrationFormData>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [closed, setClosed] = useState(false);
  const [closedReason, setClosedReason] = useState("");
  const [checking, setChecking] = useState(true);
  const [footballFull, setFootballFull] = useState(false);
  const [soccerFull, setSoccerFull] = useState(false);

  useEffect(() => {
    fetch("/api/registration-status")
      .then((res) => res.json())
      .then((data) => {
        if (!data.open) {
          setClosed(true);
          setClosedReason(data.reason);
        }
        if (data.footballFull) setFootballFull(true);
        if (data.soccerFull) setSoccerFull(true);
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  function set(field: keyof RegistrationFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <p className="text-sm text-white/40">Loading...</p>
      </main>
    );
  }

  if (closed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080808] text-white">
        <div className="max-w-md px-4 text-center">
          <Image src="/images/mijo_logo.png" alt="Mijo" width={48} height={48} className="mx-auto rounded-xl" />
          <h1 className="mt-6 text-2xl font-black tracking-tight">Registration Closed</h1>
          <p className="mt-3 text-sm leading-7 text-white/50">{closedReason}</p>
          <Link href="/" className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-black transition hover:bg-white/90">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  function next() {
    setError("");
    if (!validateStep()) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setError("");
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateStep(): boolean {
    if (step === 0) {
      if (!form.athlete_first_name || !form.athlete_last_name || !form.athlete_age || !form.gender || !form.sport || !form.school_name || !form.grade || !form.shirt_size) {
        setError("Please fill in all required fields.");
        return false;
      }
      const age = parseInt(form.athlete_age);
      if (isNaN(age) || age < 13 || age > 18) {
        setError("Athlete must be between 13 and 18 years old.");
        return false;
      }
    }
    if (step === 1) {
      if (!form.parent_name || !form.parent_email || !form.parent_phone || !form.emergency_name || !form.emergency_phone) {
        setError("Please fill in all required fields.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parent_email)) {
        setError("Please enter a valid email address.");
        return false;
      }
    }
    if (step === 3) {
      if (!form.waiver_accepted || !form.waiver_photo_accepted || !form.waiver_adult_accepted) {
        setError("You must accept all three waivers to continue.");
        return false;
      }
    }
    return true;
  }

  async function handleSubmit() {
    setError("");
    if (!validateStep()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">
      {/* Nav */}
      <nav className="border-b border-white/[0.06] bg-[#080808]/90 backdrop-blur-xl px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-sm text-white/50 transition hover:text-white">
            <Image src="/images/mijo_logo.png" alt="Mijo" width={24} height={24} className="rounded-md object-contain" />
            <span>← Back to home</span>
          </a>
          <span className="text-xs text-white/30">Mijos Tóxicos Camp</span>
        </div>
      </nav>

      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">Register Your Athlete</h1>
          <p className="mt-3 text-base text-white/50">Mijos Tóxicos Football × Soccer Camp · July 11, 2026</p>
        </div>

        {/* Step indicator */}
        <div className="mb-10 flex gap-3">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1.5 rounded-full transition-all duration-500 ${i < step ? "bg-gradient-to-r from-green-500 to-red-500" : i === step ? "bg-white" : "bg-white/10"}`} />
              <p className={`mt-2.5 text-[10px] uppercase tracking-widest transition-colors ${i === step ? "text-white" : i < step ? "text-white/50" : "text-white/20"}`}>{label}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="rounded-[2rem] border border-white/[0.08] bg-[#0d0d0d] p-7 sm:p-10">
          <div className="transition-opacity duration-300">
            {step === 0 && <StepAthlete form={form} set={set} footballFull={footballFull} soccerFull={soccerFull} />}
            {step === 1 && <StepParent form={form} set={set} />}
            {step === 2 && <StepMedical form={form} set={set} />}
            {step === 3 && <StepWaiver form={form} set={set} />}
          </div>

          {error && (
            <p className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="mt-8 flex gap-3">
            {step > 0 && (
              <button onClick={back} className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.06]">
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={next} className="flex-1 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-black transition hover:scale-[1.01]">
                Continue
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading} className="flex-1 rounded-2xl bg-[#D4AF37] px-5 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(212,175,55,0.3)] transition hover:scale-[1.01] hover:bg-[#C5A028] disabled:opacity-50">
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-white/25">
          Secured by Stripe · Registration fee is non-refundable
        </p>
      </div>
    </main>
  );
}

// ── Shared components ─────────────────────────────────────────────

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/45">
        {label}
        {required ? <span className="text-red-400">*</span> : <span className="normal-case tracking-normal text-white/20">(optional)</span>}
      </label>
      {hint && <p className="mb-2.5 text-sm text-white/30">{hint}</p>}
      {children}
    </div>
  );
}

const inputClass = "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3.5 text-base text-white placeholder-white/20 outline-none focus:border-white/20 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(255,255,255,0.04)] transition";

// ── Step 1: Athlete ───────────────────────────────────────────────

function StepAthlete({ form, set, footballFull, soccerFull }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void; footballFull: boolean; soccerFull: boolean }) {
  const sportFull = (form.sport === "football" && footballFull) || (form.sport === "soccer" && soccerFull);

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Athlete Information</h2>
        <p className="mt-1 text-sm text-white/40">Tell us about the athlete registering for camp.</p>
      </div>

      {sportFull && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-400">
          {form.sport === "football" ? "Football" : "Soccer"} registration is currently full. You may select the other sport or join the waitlist.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Athlete First Name" required>
          <input className={inputClass} value={form.athlete_first_name} onChange={e => set("athlete_first_name", e.target.value)} placeholder="First name" />
        </Field>
        <Field label="Athlete Last Name" required>
          <input className={inputClass} value={form.athlete_last_name} onChange={e => set("athlete_last_name", e.target.value)} placeholder="Last name" />
        </Field>
        <Field label="Age" required>
          <input className={inputClass} type="number" min={13} max={18} value={form.athlete_age} onChange={e => set("athlete_age", e.target.value)} placeholder="Must be 13–18" />
        </Field>
        <Field label="Gender" required>
          <select className={inputClass} value={form.gender} onChange={e => set("gender", e.target.value)}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Field>
        <Field label="Sport" required>
          <select className={inputClass} value={form.sport} onChange={e => set("sport", e.target.value)}>
            <option value="football">Football</option>
            <option value="soccer">Soccer</option>
          </select>
        </Field>
        <Field label="Position">
          <input className={inputClass} value={form.position} onChange={e => set("position", e.target.value)} placeholder={form.sport === "football" ? "e.g. Quarterback, Wide Receiver" : "e.g. Midfielder, Goalkeeper"} />
        </Field>
        <Field label="School Name" required>
          <input className={inputClass} value={form.school_name} onChange={e => set("school_name", e.target.value)} placeholder="School name" />
        </Field>
        <Field label="Grade" required>
          <select className={inputClass} value={form.grade} onChange={e => set("grade", e.target.value)}>
            <option value="">Select grade</option>
            {["7th", "8th", "9th", "10th", "11th", "12th"].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Jersey / Shirt Size" required>
          <select className={inputClass} value={form.shirt_size} onChange={e => set("shirt_size", e.target.value)}>
            <option value="">Select size</option>
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">X-Large (XL)</option>
            <option value="XXL">XX-Large (XXL)</option>
            <option value="3XL">3X-Large (3XL)</option>
          </select>
        </Field>
      </div>

      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" checked={form.scholarship_interest} onChange={e => set("scholarship_interest", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded accent-white" />
          <div>
            <p className="text-sm font-medium text-white">Consider me for a scholarship</p>
            <p className="mt-0.5 text-xs text-white/40">1 scholarship available per sport (football & soccer). Recipients selected and notified before the event.</p>
          </div>
        </label>
      </div>
    </div>
  );
}

// ── Step 2: Parent & Emergency ────────────────────────────────────

function StepParent({ form, set }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Parent / Guardian</h2>
        <p className="mt-1 text-sm text-white/40">Confirmation and updates will be sent to this contact.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input className={inputClass} value={form.parent_name} onChange={e => set("parent_name", e.target.value)} placeholder="Full name" />
        </Field>
        <Field label="Email Address" required>
          <input className={inputClass} type="email" value={form.parent_email} onChange={e => set("parent_email", e.target.value)} placeholder="email@example.com" />
        </Field>
        <Field label="Phone Number" required>
          <input className={inputClass} type="tel" value={form.parent_phone} onChange={e => set("parent_phone", e.target.value)} placeholder="(555) 000-0000" />
        </Field>
      </div>

      <div className="border-t border-white/[0.06] pt-5">
        <h2 className="text-xl font-bold">Emergency Contact</h2>
        <p className="mt-1 text-sm text-white/40">Someone we can reach if the parent/guardian is unavailable.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Contact Name" required>
          <input className={inputClass} value={form.emergency_name} onChange={e => set("emergency_name", e.target.value)} placeholder="Full name" />
        </Field>
        <Field label="Contact Phone" required>
          <input className={inputClass} type="tel" value={form.emergency_phone} onChange={e => set("emergency_phone", e.target.value)} placeholder="(555) 000-0000" />
        </Field>
      </div>
    </div>
  );
}

// ── Step 3: Medical & Other ───────────────────────────────────────

function StepMedical({ form, set }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Medical & Additional Info</h2>
        <p className="mt-1 text-sm text-white/40">Help us keep your athlete safe on event day.</p>
      </div>
      <Field label="Medical Conditions / Allergies / Injuries" hint="Include anything camp staff should be aware of. Write 'None' if not applicable.">
        <textarea className={`${inputClass} min-h-[100px] resize-none`} value={form.medical_notes} onChange={e => set("medical_notes", e.target.value)} placeholder="e.g. Asthma, peanut allergy, sprained ankle — or write 'None'" />
      </Field>
      <Field label="Insurance Provider">
        <input className={inputClass} value={form.insurance_provider} onChange={e => set("insurance_provider", e.target.value)} placeholder="e.g. Blue Cross, Kaiser" />
      </Field>
      <Field label="Social Media Handle">
        <input className={inputClass} value={form.social_handle} onChange={e => set("social_handle", e.target.value)} placeholder="@handle" />
      </Field>
      <Field label="How did you hear about us?">
        <select className={inputClass} value={form.heard_from} onChange={e => set("heard_from", e.target.value)}>
          <option value="">Select one</option>
          <option value="Instagram">Instagram</option>
          <option value="TikTok">TikTok</option>
          <option value="Twitter / X">Twitter / X</option>
          <option value="Friend or family">Friend or family</option>
          <option value="Coach or school">Coach or school</option>
          <option value="Other">Other</option>
        </select>
      </Field>
    </div>
  );
}

// ── Step 4: Waivers ───────────────────────────────────────────────

function StepWaiver({ form, set }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Waivers & Consent</h2>
        <p className="mt-1 text-sm text-white/40">Please read and accept all three waivers before proceeding to payment.</p>
      </div>

      {/* Waiver 1: Release & Indemnification (Minor) */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        <div className="border-b border-white/[0.06] px-5 py-3">
          <p className="text-sm font-semibold text-white">1. Release & Indemnification Form (Minor)</p>
        </div>
        <div className="max-h-60 overflow-y-auto p-5 text-xs leading-6 text-white/50">
          <p>I, the undersigned parent or legal guardian, individually and on behalf of my child/ward, do hereby knowingly and voluntarily enter into this agreement.</p>
          <p className="mt-3">I understand and acknowledge the dangers and risks inherent in the game of football and soccer, including <strong className="text-white/70">SERIOUS BODILY INJURY OR DEATH</strong>, and I knowingly and voluntarily accept and assume such risk, both individually and on behalf of my participating child/ward. I expressly acknowledge that the INJURIES RECEIVED MAY BE COMPOUNDED OR INCREASED BY NEGLIGENT RESCUE OPERATIONS OR PROCEDURES OF THE RELEASEES.</p>
          <p className="mt-3">For good and valuable consideration, I, on behalf of myself, my child/ward, and either of our executors, heirs, assigns, and anyone authorized by any of them, hereby release, discharge, and agree to hold harmless MIJO THINGS LLC, its affiliates, agents, employees, officers, directors, shareholders, owners, managers, members, successors or assigns (collectively, the &quot;Releasees&quot;), from and against any and all right, claim, demand, action, cause of action, suit and/or litigation for any economic and/or non-economic losses on account of any damage to person or property, including but not limited to bodily injury, death, disability or other damage sustained relating in any manner to the participation of my child/ward in the Event whether caused in whole or in part, by the sole or concurrent negligence or wrongdoings, of the Releasees or otherwise.</p>
          <p className="mt-3">I understand and acknowledge that the Releasees have not arranged for and do not carry insurance of any kind for my benefit relative to my child/ward&apos;s participation in the Event. I am solely responsible for obtaining and paying for any insurance I may desire. If my child/ward needs medical treatment, I agree to be financially responsible for any costs incurred.</p>
          <p className="mt-3">I hereby forever release, waive, discharge and covenant not to sue Releasees for any loss or damage on account of any property damage, loss or theft, or any injury to, or an illness or the death of, my child/ward whether caused by the negligence, active or passive, of a Releasee or otherwise.</p>
          <p className="mt-3">I agree to indemnify, defend, and hold harmless the Releasees from and against any and all costs, expenses, damages, claims, lawsuits, judgments, losses, and/or liabilities (including attorneys&apos; fees) arising from any claims made by or against any of the Releasees due to bodily injury, property damage, injury, illness, or death of my child/ward.</p>
          <p className="mt-3">This Release is governed by the laws of the State of California. Jurisdiction within the applicable State Court in the County of Los Angeles.</p>
          <p className="mt-3 font-semibold text-white/70">I understand that I have given up substantial rights by signing this Release and have signed it freely and voluntarily without any inducement, and I INTEND MY SIGNATURE TO BE A COMPLETE AND UNCONDITIONAL RELEASE of all liability to the greatest extent allowed by law.</p>
        </div>
        <div className="border-t border-white/[0.06] px-5 py-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={form.waiver_accepted} onChange={e => set("waiver_accepted", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded accent-white" />
            <span className="text-sm text-white/75">I have read and agree to the Release & Indemnification Form on behalf of my minor child/ward.</span>
          </label>
        </div>
      </div>

      {/* Waiver 2: Photo/Video Release */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        <div className="border-b border-white/[0.06] px-5 py-3">
          <p className="text-sm font-semibold text-white">2. Participant Video/Photo Release Form</p>
        </div>
        <div className="max-h-60 overflow-y-auto p-5 text-xs leading-6 text-white/50">
          <p>In consideration for my child/ward&apos;s participation in the MIJO Sports Camp (the &quot;Event&quot;) and all activities provided at the Event, I hereby irrevocably grant to MIJO Things LLC (&quot;MIJO&quot;) the following rights in connection with recordings created at the Event:</p>
          <p className="mt-3">I grant to MIJO every consent to enable MIJO to take any photographs, films and/or audio and/or audio-visual recordings of the participant (collectively, &quot;the Recordings&quot;).</p>
          <p className="mt-3">I grant to MIJO the right to use and exploit the Recordings whether alone or in conjunction with other photographs and/or recordings in such manner as MIJO may wish in connection with the production, promotion and exploitation of any audio recordings and/or footage derived from the Recordings in any and all media and processes throughout the universe in perpetuity.</p>
          <p className="mt-3">I grant to MIJO the unrestricted right to use the participant&apos;s name, voice and likeness without further payment in connection with any use of the Recordings.</p>
          <p className="mt-3">I acknowledge that MIJO will be the sole owner of the Recordings and of the entire copyright and all other rights therein throughout the world for the full period of copyright and any extensions thereof.</p>
          <p className="mt-3">I waive the benefit of any &quot;moral rights&quot; arising pursuant to applicable law in perpetuity.</p>
          <p className="mt-3">MIJO shall be entitled to assign or license the whole or any part of the benefit of this Release to any third party.</p>
          <p className="mt-3">This Release shall be governed by and construed in accordance with California law. Each party consents to exclusive jurisdiction and venue of the state or federal courts located within Los Angeles County, California.</p>
        </div>
        <div className="border-t border-white/[0.06] px-5 py-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={form.waiver_photo_accepted} onChange={e => set("waiver_photo_accepted", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded accent-white" />
            <span className="text-sm text-white/75">I have read and agree to the Video/Photo Release Form. I consent to the use of my child/ward&apos;s likeness in connection with the Event.</span>
          </label>
        </div>
      </div>

      {/* Waiver 3: Adult Release & Indemnification */}
      <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
        <div className="border-b border-white/[0.06] px-5 py-3">
          <p className="text-sm font-semibold text-white">3. Release & Indemnification Form (Adult/Guardian)</p>
        </div>
        <div className="max-h-60 overflow-y-auto p-5 text-xs leading-6 text-white/50">
          <p>I, the parent/guardian, hereby knowingly and voluntarily enter into this agreement on my own behalf as an attendee at the Event.</p>
          <p className="mt-3">I understand and acknowledge the dangers and risks inherent in attending a football and soccer event, including <strong className="text-white/70">SERIOUS BODILY INJURY OR DEATH</strong>, and I knowingly and voluntarily accept and assume such risk.</p>
          <p className="mt-3">For good and valuable consideration, I, on behalf of myself, my executors, heirs, assigns, and anyone authorized by any of them, hereby release, discharge, and agree to hold harmless MIJO THINGS LLC, its affiliates, agents, employees, officers, directors, shareholders, owners, managers, members, successors or assigns (collectively, the &quot;Releasees&quot;), from and against any and all claims for any economic and/or non-economic losses on account of any damage to person or property, including but not limited to bodily injury, death, disability or other damage sustained by me relating to my attendance at the Event.</p>
          <p className="mt-3">I understand that the Releasees have not arranged for and do not carry insurance of any kind for my benefit. I am solely responsible for obtaining any insurance I may desire. If I need medical treatment, I agree to be financially responsible for any costs incurred.</p>
          <p className="mt-3">I hereby forever release, waive, discharge and covenant not to sue Releasees for any loss or damage on account of any property damage, loss or theft, or any injury to, or an illness or the death of, me whether caused by the negligence, active or passive, of a Releasee or otherwise while I am an attendee at the Event.</p>
          <p className="mt-3">I agree to indemnify, defend, and hold harmless the Releasees from and against any and all costs, expenses, damages, claims, lawsuits, judgments, losses, and/or liabilities arising from any claims related to my attendance.</p>
          <p className="mt-3">This Release is governed by the laws of the State of California. Jurisdiction within the applicable State Court in the County of Los Angeles.</p>
          <p className="mt-3 font-semibold text-white/70">I understand that I have given up substantial rights by signing this Release and have signed it freely and voluntarily without any inducement, and I INTEND MY SIGNATURE TO BE A COMPLETE AND UNCONDITIONAL RELEASE of all liability to the greatest extent allowed by law.</p>
        </div>
        <div className="border-t border-white/[0.06] px-5 py-3">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={form.waiver_adult_accepted} onChange={e => set("waiver_adult_accepted", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 rounded accent-white" />
            <span className="text-sm text-white/75">I have read and agree to the Adult Release & Indemnification Form on my own behalf as the attending parent/guardian.</span>
          </label>
        </div>
      </div>

      <p className="text-xs text-white/30 text-center">By checking all boxes above, you are digitally signing these agreements.</p>
    </div>
  );
}
