import {
  CognitoIdentityProviderClient,
  CreateUserPoolCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const client = new CognitoIdentityProviderClient({
  region: "eu-west-1",
});

const createUserPool = async () => {
  const params = {
    PoolName: "ForumUserPool",
    Policies: {
      PasswordPolicy: {
        MinimumLength: 8,
        RequireUppercase: true,
        RequireLowercase: true,
        RequireNumbers: true,
        RequireSymbols: true,
      },
    },
    UsernameAttributes: [], // Attributes to identify users (username, email, etc.)
    AutoVerifiedAttributes: ["email"], // Automatically verify emails
    Schema: [
      {
        Name: "email",
        Required: true,
        Mutable: true,
        AttributeDataType: "String",
      },
      // Add other attributes as needed
    ],
    AdminCreateUserConfig: {
      AllowAdminCreateUserOnly: false, // Allow users to sign up
    },
  };

  try {
    const command = new CreateUserPoolCommand(params);
    const data = await client.send(command);
    console.log("User pool created successfully:", data);
  } catch (error) {
    console.error("Error creating user pool:", error);
  }
};

createUserPool();
