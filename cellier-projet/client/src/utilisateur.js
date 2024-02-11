import { Auth } from "aws-amplify";
import { useResolvedPath } from "react-router-dom";

export async function email() {
  try {
    // Attempt to fetch the current authenticated user
    const user = await Auth.currentAuthenticatedUser({
      bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    });

    // If the user is authenticated, proceed to check for the email
    if (user && user.attributes.email) {
      return user.attributes.email;
    } else if (user && Auth.user.username) {
      return Auth.user.username;
    }
  } catch (error) {
    // Handle the case where no user is authenticated
    console.log("No authenticated user found:", error);
    // Depending on your application's flow, you might want to redirect to a login page here
    return null; // or throw an error, or handle this case as appropriate for your app
  }
}
