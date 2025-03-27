import {
  registerUser as registerUserService,
  authenticateUser as authenticateUserService,
} from "../service/authenticationService.js";

export const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      error: "All fields are required: username, password, and email.",
    });
  }

  try {
    // Call the service function to register the user
    const result = await registerUserService(username, password, email);

    // Return the result from the service
    return res.status(200).json({
      message: "User successfully registered.",
      result,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Registration error:", error);

    // Respond with a 500 error and the error message
    return res.status(500).json({
      error: error.message || "An error occurred during registration.",
    });
  }
};

export const authenticateUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      error: "All fields are required: username and password.",
    });
  }

  try {
    const result = await authenticateUserService(username, password);
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
