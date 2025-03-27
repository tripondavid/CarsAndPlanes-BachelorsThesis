export const addComment = async (forumPostID, content) => {
  const apiURL = process.env.REACT_APP_ADD_COMMENT_POST_URL;
  const body = {
    forumPostID: forumPostID,
    content: content,
  };
  const method = "POST";
  const headers = {
    "Content-type": "application/json",
    Authorization: sessionStorage.getItem("token"),
  };

  try {
    const response = await fetch(apiURL, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`Failed to add comment, status: ${response.status}`);
    }

    //const result = await response.json();

    return response; // Return the fetched data
  } catch (error) {
    console.error("Error while adding comment:", error);
    //return error;
    throw error; // Rethrow or handle the error as needed
  }
};
