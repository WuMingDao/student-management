import { supabase } from "../utils/supabase.js";

export async function uploadAvatar(avatarFile: string, avatarFileName: string) {
  const { error } = await supabase.storage
    .from("avatar")
    .upload(`public/${avatarFileName}`, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
}
