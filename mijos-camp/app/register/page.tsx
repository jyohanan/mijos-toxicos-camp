"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
};

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegistrationFormData>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof RegistrationFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function next() {
    setError("");
    if (!validateStep()) return;
    setStep((s) => s + 1);
  }

  function back() {
    setError("");
    setStep((s) => s - 1);
  }

  function validateStep(): boolean {
    if (step === 0) {
      if (!form.athlete_first_name || !form.athlete_last_name || !form.athlete_age || !form.athlete_dob || !form.gender || !form.school_name || !form.grade || !form.shirt_size) {
        setError("Please fill in all required fields.");
        return false;
      }
    }
    if (step === 1) {
      if (!form.parent_name || !form.parent_email || !form.parent_phone || !form.emergency_name || !form.emergency_phone) {
        setError("Please fill in all required fields.");
        return false;
      }
    }
    if (step === 3) {
      if (!form.waiver_accepted) {
        setError("You must accept the waiver to continue.");
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
      // Redirect to Stripe checkout
      window.location.href = data.checkoutUrl;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <a href="/" className="text-sm text-white/50 hover:text-white transition">← Back to home</a>
          <h1 className="mt-4 text-3xl font-black tracking-tight">Register Your Athlete</h1>
          <p className="mt-2 text-sm text-white/60">Mijos Tóxicos Dual Sports Camp · June 13, 2026</p>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex gap-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-1 rounded-full transition-all ${i <= step ? "bg-white" : "bg-white/15"}`} />
              <p className={`mt-2 text-[10px] uppercase tracking-widest ${i === step ? "text-white" : "text-white/35"}`}>{label}</p>
            </div>
          ))}
        </div>

        {/* Form card */}
        <div className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8">
          {step === 0 && <StepAthlete form={form} set={set} />}
          {step === 1 && <StepParent form={form} set={set} />}
          {step === 2 && <StepMedical form={form} set={set} />}
          {step === 3 && <StepWaiver form={form} set={set} />}

          {error && (
            <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            {step > 0 && (
              <button
                onClick={back}
                className="flex-1 rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
              >
                Back
              </button>
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="flex-1 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.01]"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 rounded-2xl bg-white px-5 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:opacity-50"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Step components ──────────────────────────────────────────────

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-white/50">
        {label}{required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 focus:bg-white/[0.07] transition";
const selectClass = inputClass;

function StepAthlete({ form, set }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Athlete Information</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="First Name" required>
          <input className={inputClass} value={form.athlete_first_name} onChange={e => set("athlete_first_name", e.target.value)} placeholder="First name" />
        </Field>
        <Field label="Last Name" required>
          <input className={inputClass} value={form.athlete_last_name} onChange={e => set("athlete_last_name", e.target.value)} placeholder="Last name" />
        </Field>
        <Field label="Age" required>
          <input className={inputClass} type="number" min={13} max={18} value={form.athlete_age} onChange={e => set("athlete_age", e.target.value)} placeholder="Age (13–18)" />
        </Field>
        <Field label="Date of Birth" required>
          <input className={inputClass} type="date" value={form.athlete_dob} onChange={e => set("athlete_dob", e.target.value)} />
        </Field>
        <Field label="Gender" required>
          <select className={selectClass} value={form.gender} onChange={e => set("gender", e.target.value)}>
            <option value="">Select gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Non-binary</option>
            <option>Prefer not to say</option>
          </select>
        </Field>
        <Field label="Sport" required>
          <select className={selectClass} value={form.sport} onChange={e => set("sport", e.target.value)}>
            <option value="football">Football</option>
            <option value="soccer">Soccer</option>
          </select>
        </Field>
        <Field label="Position (optional)">
          <input className={inputClass} value={form.position} onChange={e => set("position", e.target.value)} placeholder="e.g. Quarterback, Midfielder" />
        </Field>
        <Field label="School Name" required>
          <input className={inputClass} value={form.school_name} onChange={e => set("school_name", e.target.value)} placeholder="School name" />
        </Field>
        <Field label="Grade" required>
          <select className={selectClass} value={form.grade} onChange={e => set("grade", e.target.value)}>
            <option value="">Select grade</option>
            {["7th","8th","9th","10th","11th","12th"].map(g => <option key={g}>{g}</option>)}
          </select>
        </Field>
        <Field label="Jersey / Shirt Size" required>
          <select className={selectClass} value={form.shirt_size} onChange={e => set("shirt_size", e.target.value)}>
            <option value="">Select size</option>
            {["YS","YM","YL","S","M","L","XL","XXL"].map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Scholarship Interest">
        <label className="flex cursor-pointer items-center gap-3">
          <input type="checkbox" checked={form.scholarship_interest} onChange={e => set("scholarship_interest", e.target.checked)} className="h-4 w-4 rounded" />
          <span className="text-sm text-white/70">I would like to be considered for a scholarship (2 awarded per sport)</span>
        </label>
      </Field>
    </div>
  );
}

function StepParent({ form, set }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Parent / Guardian</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" required>
          <input className={inputClass} value={form.parent_name} onChange={e => set("parent_name", e.target.value)} placeholder="Full name" />
        </Field>
        <Field label="Email" required>
          <input className={inputClass} type="email" value={form.parent_email} onChange={e => set("parent_email", e.target.value)} placeholder="Email address" />
        </Field>
        <Field label="Phone Number" required>
          <input className={inputClass} type="tel" value={form.parent_phone} onChange={e => set("parent_phone", e.target.value)} placeholder="(555) 000-0000" />
        </Field>
      </div>

      <h2 className="pt-4 text-xl font-bold">Emergency Contact</h2>
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

function StepMedical({ form, set }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Medical & Additional Info</h2>
      <Field label="Medical Conditions / Allergies / Injuries">
        <textarea className={`${inputClass} min-h-[100px] resize-none`} value={form.medical_notes} onChange={e => set("medical_notes", e.target.value)} placeholder="List any conditions, allergies, or injuries (or write 'None')" />
      </Field>
      <Field label="Insurance Provider (optional)">
        <input className={inputClass} value={form.insurance_provider} onChange={e => set("insurance_provider", e.target.value)} placeholder="Insurance provider name" />
      </Field>
      <Field label="Social Media Handle (optional)">
        <input className={inputClass} value={form.social_handle} onChange={e => set("social_handle", e.target.value)} placeholder="@handle" />
      </Field>
      <Field label="How did you hear about us?">
        <select className={selectClass} value={form.heard_from} onChange={e => set("heard_from", e.target.value)}>
          <option value="">Select one</option>
          <option>Instagram</option>
          <option>TikTok</option>
          <option>Twitter / X</option>
          <option>Friend or family</option>
          <option>Coach or school</option>
          <option>Other</option>
        </select>
      </Field>
    </div>
  );
}

function StepWaiver({ form, set }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void }) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-bold">Waiver & Consent</h2>
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/60 max-h-64 overflow-y-auto space-y-3">
        <p><strong className="text-white/80">Liability Waiver:</strong> I understand that participation in athletic activities involves risk of injury. I voluntarily assume all risks associated with participation in the Mijos Tóxicos Dual Sports Camp and release the organizers, staff, and volunteers from any liability.</p>
        <p><strong className="text-white/80">Medical Treatment Consent:</strong> I authorize the camp staff to obtain emergency medical treatment for my child if I cannot be reached.</p>
        <p><strong className="text-white/80">Photo / Video Release:</strong> I grant permission for photos and videos taken at the event to be used for promotional purposes.</p>
        <p><strong className="text-white/80">Refund Policy:</strong> Registration fees are non-refundable. In the event the camp is cancelled, a full refund will be issued.</p>
      </div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          checked={form.waiver_accepted}
          onChange={e => set("waiver_accepted", e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded"
        />
        <span className="text-sm text-white/80">
          I have read and agree to the liability waiver, medical treatment consent, photo/video release, and refund policy on behalf of my athlete. This serves as my digital signature.
        </span>
      </label>
    </div>
  );
}
