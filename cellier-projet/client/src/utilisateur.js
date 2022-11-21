import { Auth } from "aws-amplify";
import { useResolvedPath } from "react-router-dom";

export async function email() {
  const email = await Auth.currentAuthenticatedUser({
    bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  });
  if (email.attributes.email) {
    return email.attributes.email;
  } else if (Auth.user.username) {
    return Auth.user.username;
  }
}
