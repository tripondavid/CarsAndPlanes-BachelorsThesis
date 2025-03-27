export const registerRequest = async (email, username, password) => {
  const apiURL = process.env.REACT_APP_REGISTER_URL;
  const body = {
    email: email,
    username: username,
    password: password,
  };
  const method = "POST";
  const headers = {
    "Content-type": "application/json",
  };

  try {
    const response = await fetch(apiURL, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to register, status: ${response.status}`);
    }

    const result = await response.json();
    return result; // Return the fetched data
  } catch (error) {
    console.error("Error while registering:", error);
    return error;
    //throw error; // Rethrow or handle the error as needed
  }
};
