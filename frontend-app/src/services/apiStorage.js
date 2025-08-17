import { getConfig } from "../utils/configHepler.js";
import { supabase } from "../utils/supabase.js";
import { updateUser } from "./apiAuth.js";

const supabaseToken = getConfig("SUPABASE_TOKEN");
const supabaseUrl = getConfig("SUPABASE_URL");

const userToken = JSON.parse(localStorage.getItem(supabaseToken));

export async function uploadAvatar(avatarFile) {
  const avatarFileName = `${userToken.user.email}-${Date.now()}.png`;

  const { data, error } = await supabase.storage
    .from("avatar")
    // TODO: Change the file name
    .upload(`public/${avatarFileName}`, avatarFile, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }

  const newAvatarUrl = `${supabaseUrl}/storage/v1/object/public/avatar/public/${avatarFileName}`;

  const newUserMetadata = await updateUser({ avatar: newAvatarUrl });

  return newUserMetadata;
}
