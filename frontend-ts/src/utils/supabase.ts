import { createClient } from "@supabase/supabase-js";
import { getConfig } from "./configHelper";
import type { Database } from "../types/database.types";

const supabaseUrl = getConfig("SUPABASE_URL");
const supabaseKey = getConfig("SUPABASE_KEY");
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
