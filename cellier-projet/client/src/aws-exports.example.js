/* eslint-disable */
// Copy to aws-exports.js and fill with your Amplify / Cognito values.
// aws-exports.js is gitignored — generate with: amplify pull (or copy from AWS Console).

const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_identity_pool_id: "REGION:identity-pool-id",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_XXXXXXXXX",
  aws_user_pools_web_client_id: "your-app-client-id",
  oauth: {
    domain: "your-domain.auth.us-east-1.amazoncognito.com",
    scope: ["phone", "email", "openid", "profile", "aws.cognito.signin.user.admin"],
    redirectSignIn: "https://your-production-domain.com",
    redirectSignOut: "https://your-production-domain.com",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: [],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [
      "REQUIRES_LOWERCASE",
      "REQUIRES_NUMBERS",
      "REQUIRES_SYMBOLS",
      "REQUIRES_UPPERCASE",
    ],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
};

export default awsmobile;
