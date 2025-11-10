import { getUser } from "../services/apiAuth";

export async function isAutthenticated() {
  const user = await getUser();

  if (!user) {
    return false;
  }

  return true;
}
