import {
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession,
  signOut,
  deleteUser,
  updatePassword,
  updateUserAttribute,
} from "aws-amplify/auth";

function withTimeout(promise, ms, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error(`${label} timed out after ${ms}ms`)),
        ms
      );
    }),
  ]);
}

function emailFromTokenPayload(payload) {
  if (!payload) return null;
  const candidates = [
    payload.email,
    payload["cognito:username"],
    payload.preferred_username,
  ];
  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

export function emailFromCognitoUser(user) {
  if (!user) return null;
  const candidates = [
    user.signInDetails?.loginId,
    user.username,
    user.userId,
  ];
  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return null;
}

export async function getUserEmail() {
  let currentUser = null;

  try {
    currentUser = await withTimeout(getCurrentUser(), 12000, "getCurrentUser");
  } catch (err) {
    console.warn("getCurrentUser:", err);
    return null;
  }

  try {
    const attributes = await withTimeout(
      fetchUserAttributes(),
      12000,
      "fetchUserAttributes"
    );
    if (attributes.email) {
      return attributes.email;
    }
  } catch (err) {
    console.warn("fetchUserAttributes:", err);
  }

  try {
    const session = await withTimeout(
      fetchAuthSession({ forceRefresh: true }),
      12000,
      "fetchAuthSession"
    );
    const fromToken = emailFromTokenPayload(session.tokens?.idToken?.payload);
    if (fromToken) {
      return fromToken;
    }
  } catch (err) {
    console.warn("fetchAuthSession:", err);
  }

  const loginId = currentUser.signInDetails?.loginId;
  if (typeof loginId === "string" && loginId.trim()) {
    return loginId.trim();
  }

  if (currentUser.username?.trim()) {
    return currentUser.username.trim();
  }

  return null;
}

export async function getUserEmailWithRetry(maxAttempts = 8, delayMs = 500) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const userEmail = await getUserEmail();
    if (userEmail) {
      return userEmail;
    }
    if (attempt < maxAttempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  return null;
}

export {
  getCurrentUser,
  fetchUserAttributes,
  fetchAuthSession,
  signOut,
  deleteUser,
  updatePassword,
  updateUserAttribute,
};
