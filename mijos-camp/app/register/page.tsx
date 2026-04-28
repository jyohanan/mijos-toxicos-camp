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
};

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<RegistrationFormData>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [closed, setClosed] = useState(false);
  const [closedReason, setClosedReason] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/registration-status")
      .then((res) => res.json())
      .then((data) => {
        if (!data.open) {
          setClosed(true);
          setClosedReason(data.reason);
        }
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
      if (!form.athlete_first_name || !form.athlete_last_name || !form.athlete_age || !form.athlete_dob || !form.gender || !form.sport || !form.school_name || !form.grade || !form.shirt_size) {
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
          <p className="mt-3 text-base text-white/50">Mijos Tóxicos Football × Soccer Camp · June 13, 2026</p>
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
            {step === 0 && <StepAthlete form={form} set={set} />}
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

function StepAthlete({ form, set }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Athlete Information</h2>
        <p className="mt-1 text-sm text-white/40">Tell us about the athlete registering for camp.</p>
      </div>

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
        <Field label="Date of Birth" required>
          <input className={inputClass} type="date" value={form.athlete_dob} onChange={e => set("athlete_dob", e.target.value)} />
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
            <option value="YS">Youth Small (YS)</option>
            <option value="YM">Youth Medium (YM)</option>
            <option value="YL">Youth Large (YL)</option>
            <option value="S">Small (S)</option>
            <option value="M">Medium (M)</option>
            <option value="L">Large (L)</option>
            <option value="XL">X-Large (XL)</option>
            <option value="XXL">XX-Large (XXL)</option>
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

// ── Step 4: Waiver ────────────────────────────────────────────────

function StepWaiver({ form, set }: { form: RegistrationFormData; set: (f: keyof RegistrationFormData, v: string | boolean) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold">Waiver & Consent</h2>
        <p className="mt-1 text-sm text-white/40">Please read and accept before proceeding to payment.</p>
      </div>
      <div className="max-h-80 space-y-5 overflow-y-auto rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-sm leading-7 text-white/55">
        <div>
          <p className="mb-1 font-semibold text-white/80">1. Assumption of Risk & Liability Waiver</p>
          <p>I, the undersigned parent or legal guardian, acknowledge that participation in the Mijos Tóxicos Football × Soccer Camp (&quot;the Event&quot;) involves inherent risks, including but not limited to physical contact, falls, collisions, sprains, fractures, concussions, heat-related illness, and other injuries that may result from athletic activity. I understand that these risks exist regardless of the precautions taken by the Event organizers.</p>
          <p className="mt-2">On behalf of myself and my minor child (&quot;the Participant&quot;), I voluntarily assume all risks associated with participation in the Event. I hereby release, waive, discharge, and hold harmless the Event organizers, sponsors, staff, coaches, volunteers, venue owners, and their respective officers, directors, employees, agents, and affiliates (collectively, &quot;Released Parties&quot;) from any and all liability, claims, demands, actions, or causes of action arising out of or related to any loss, damage, or injury, including death, that may be sustained by the Participant during or in connection with the Event.</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-white/80">2. Medical Treatment Authorization & Consent</p>
          <p>I authorize the Event staff and medical personnel to administer first aid and/or obtain emergency medical treatment for the Participant in the event of injury or illness during the Event if I cannot be reached in a timely manner. I understand that I am financially responsible for any medical expenses incurred as a result of such treatment.</p>
          <p className="mt-2">I confirm that the Participant is physically fit to participate in athletic activities and that I have disclosed all known medical conditions, allergies, and injuries in the registration form. I understand it is my responsibility to ensure the accuracy and completeness of this information.</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-white/80">3. Photo, Video & Media Release</p>
          <p>I grant the Event organizers and their affiliates the irrevocable right and permission to photograph, film, and record the Participant during the Event, and to use, reproduce, distribute, display, and publish such images, video, and audio recordings in any media or format, including but not limited to social media, websites, print materials, and promotional content, without compensation or further notice.</p>
          <p className="mt-2">I waive any right to inspect or approve the finished product or the use to which it may be applied. I release the Released Parties from any claims arising from the use of such media.</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-white/80">4. Code of Conduct</p>
          <p>I understand that the Participant is expected to demonstrate good sportsmanship, respect for coaches, staff, volunteers, and fellow athletes, and to follow all Event rules and instructions. The Event organizers reserve the right to remove any participant whose behavior is deemed disruptive, dangerous, or unsportsmanlike, without refund.</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-white/80">5. Personal Property</p>
          <p>I understand that the Event organizers are not responsible for any lost, stolen, or damaged personal property brought to the Event by the Participant or myself. All personal belongings are brought at our own risk.</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-white/80">6. Weather & Event Modifications</p>
          <p>I understand that the Event may be modified, delayed, or cancelled due to weather conditions, safety concerns, or other circumstances beyond the organizers&apos; control. In the event of a full cancellation by the organizers, a full refund will be issued. Partial modifications or schedule changes do not entitle registrants to a refund.</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-white/80">7. Refund & Cancellation Policy</p>
          <p>All registration fees are non-refundable and non-transferable. No refunds will be issued for voluntary withdrawal, no-shows, or removal due to conduct violations. In the event the camp is fully cancelled by the organizers, a full refund will be issued to the original payment method.</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-white/80">8. Indemnification</p>
          <p>I agree to indemnify, defend, and hold harmless the Released Parties from any and all claims, liabilities, damages, costs, and expenses (including reasonable attorney&apos;s fees) arising out of or related to the Participant&apos;s involvement in the Event, including any claims brought by third parties.</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-white/80">9. Governing Law</p>
          <p>This waiver shall be governed by and construed in accordance with the laws of the state in which the Event is held. Any disputes arising under this agreement shall be resolved in the courts of that state.</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-white/80">10. Acknowledgement</p>
          <p>I have read this waiver and release in its entirety. I fully understand its terms and conditions. I acknowledge that I am giving up substantial rights, including the right to sue. I sign this agreement freely and voluntarily without any inducement.</p>
        </div>
      </div>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
        <input
          type="checkbox"
          checked={form.waiver_accepted}
          onChange={e => set("waiver_accepted", e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded accent-white"
        />
        <span className="text-sm text-white/75">
          I have read and agree to the liability waiver, medical treatment consent, photo/video release, and refund policy on behalf of my athlete. This serves as my digital signature.
        </span>
      </label>
    </div>
  );
}
