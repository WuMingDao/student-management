import { supabase } from "../utils/supabase.js";

export async function uploadAvatar(avatarFile) {
  const { data, error } = await supabase.storage
    .from("avatar")
    // TODO: Change the file name
    .upload("public/avatar1.png", avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }

  return data;
}
