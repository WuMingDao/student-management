import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://bggjonikornjopkrntzn.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

// console.log("SupabaseKey: ", supabaseKey);
export const supabase = createClient(supabaseUrl, supabaseKey);
