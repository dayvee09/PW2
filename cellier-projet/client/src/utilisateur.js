import { getUserEmailWithRetry } from "./auth";

export async function email() {
  return getUserEmailWithRetry();
}
