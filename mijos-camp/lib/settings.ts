import { supabaseAdmin } from "./supabase";

export async function getSettings(): Promise<Record<string, string>> {
  const { data } = await supabaseAdmin.from("settings").select("key, value");
  return Object.fromEntries((data || []).map((s) => [s.key, s.value]));
}
