import { createClient } from "@supabase/supabase-js";
import { getConfig } from "./configHepler";
const supabaseUrl = "https://bggjonikornjopkrntzn.supabase.co";
const supabaseKey = getConfig("SUPABASE_KEY");
export const supabase = createClient(supabaseUrl, supabaseKey);
