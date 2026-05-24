import { getUserEmail } from "./auth";

export async function email() {
  return getUserEmail();
}
