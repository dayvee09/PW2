import {
  getCurrentUser,
  fetchUserAttributes,
  signOut,
  deleteUser,
  updatePassword,
  updateUserAttribute,
} from "aws-amplify/auth";

export async function getUserEmail() {
  try {
    await getCurrentUser();
    const attributes = await fetchUserAttributes();
    return attributes.email ?? null;
  } catch {
    return null;
  }
}

export {
  getCurrentUser,
  fetchUserAttributes,
  signOut,
  deleteUser,
  updatePassword,
  updateUserAttribute,
};
