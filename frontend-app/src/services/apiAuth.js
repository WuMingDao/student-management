import { getConfig } from "../utils/configHepler";
import { supabase } from "../utils/supabase";

export async function signup(email, password, metadata = {}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: `${email}-${Date.now()}`,
        avatar:
          "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
        ...metadata,
      },
    },
  });

  if (error) {
    console.log("Error signing up", error.message);
    return;
  }

  return data;
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("Error logging in", error.message);
    return;
  }

  return data;
}

export async function singout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error logging out", error.message);
    return;
  }
}

export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function updateUser(newUserMetadata = {}) {
  const { data, error } = await supabase.auth.updateUser({
    data: newUserMetadata,
  });

  if (error) {
    console.log("Error updating user", error.message);
    return;
  }

  return data;
}
