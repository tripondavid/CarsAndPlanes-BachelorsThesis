export const fetchCommentsPost = async (
  ForumPostID,
  lastEvaluatedKey = null,
  limit = 10
) => {
  const apiURL = process.env.REACT_APP_COMMENTS_POST_URL;
  const queryParams = new URLSearchParams({
    forumPostID: ForumPostID,
    lastEvaluatedKey: lastEvaluatedKey,
    limit: limit,
  });
  const method = "GET";
  const headers = {
    "Content-type": "application/json",
    Authorization: sessionStorage.getItem("token"),
  };

  try {
    const urlWithParams = `${apiURL}?${queryParams.toString()}`;

    const response = await fetch(urlWithParams, {
      method: method,
      headers: headers,
    });
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch comments for post, status: ${response.status}`
      );
    }

    const result = await response.json();
    return result; // Return the fetched data
  } catch (error) {
    console.error("Error fetching comments for post:", error);
    throw error; // Rethrow or handle the error as needed
  }
};
