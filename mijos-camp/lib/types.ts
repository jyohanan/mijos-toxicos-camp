export type Sport = "football" | "soccer";
export type PaymentStatus = "pending" | "paid" | "refunded";

export interface RegistrationFormData {
  // Athlete
  athlete_first_name: string;
  athlete_last_name: string;
  athlete_age: string;
  athlete_dob: string;
  gender: string;
  sport: Sport;
  position: string;
  school_name: string;
  grade: string;
  shirt_size: string;

  // Parent
  parent_name: string;
  parent_email: string;
  parent_phone: string;

  // Emergency
  emergency_name: string;
  emergency_phone: string;

  // Medical
  medical_notes: string;
  insurance_provider: string;

  // Optional
  social_handle: string;
  heard_from: string;

  // Scholarship
  scholarship_interest: boolean;

  // Waivers
  waiver_accepted: boolean;
}
