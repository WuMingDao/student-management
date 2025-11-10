import { getConfig } from "./configHelper";

export function getUserId() {
  const token = getConfig("SUPABASE_TOKEN");
  const userToken = JSON.parse(localStorage.getItem(token) as string);

  return userToken.user.id || null;
}
