import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

const clientId = process.env.APP_CLIENT_ID;
const userPoolId = process.env.USER_POOL_ID;

const poolData = {
  UserPoolId: userPoolId,
  ClientId: clientId,
};

const clientSecret = process.env.APP_CLIENT_SECRET;

const config = {
  region: "eu-west-1", // Set to your desired AWS region
};

// Initialize the Cognito client
const client = new CognitoIdentityProviderClient(config);

export const registerUser = async (username, password, email) => {
  // Calculate the SecretHash
  const secretHash = calculateSecretHash(clientId, clientSecret, username);

  // Set up the input for the SignUpCommand
  const input = {
    ClientId: clientId,
    SecretHash: secretHash,
    Username: username,
    Password: password,
    UserAttributes: [
      { Name: "email", Value: email }, // Email as user attribute
    ],
    // Optional: Additional ValidationData, AnalyticsMetadata, UserContextData, and ClientMetadata can be included if needed
  };

  // Create the SignUpCommand
  const command = new SignUpCommand(input);

  try {
    // Send the request
    const response = await client.send(command);

    // Handle the response
    console.log("User successfully registered:", response);
    return response;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const authenticateUser = async (username, password) => {
  const secretHash = calculateSecretHash(clientId, clientSecret, username);

  // Prepare the input for the AdminInitiateAuthCommand
  const input = {
    UserPoolId: userPoolId,
    ClientId: clientId,
    AuthFlow: "USER_PASSWORD_AUTH", // Authentication flow without Secure Remote Password protocol
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  };

  // Create the command
  const command = new InitiateAuthCommand(input);

  try {
    // Send the request
    const response = await client.send(command);

    // Handle the response
    console.log("Authentication successful:", response);
    return {
      accessToken: response.AuthenticationResult.AccessToken,
      idToken: response.AuthenticationResult.IdToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
    };
  } catch (error) {
    console.error("Error during authentication:", error);
    throw error;
  }
};

const calculateSecretHash = (clientId, clientSecret, username) => {
  const hmac = crypto.createHmac("sha256", clientSecret);
  hmac.update(username + clientId);
  return hmac.digest("base64");
};
