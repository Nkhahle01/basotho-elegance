import { createClient } from "@supabase/supabase-js";

let rawUrl = import.meta.env.VITE_SUPABASE_URL || "";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Defensive sanitization: remove any embedded /rest/v1 and trailing slash
const cleanUrl = rawUrl.replace(/\/rest\/v1/g, "").replace(/\/$/, "");

console.log("Sanitized Supabase Target API URL:", cleanUrl);

export const supabase = createClient(cleanUrl, anonKey);
export default supabase;
