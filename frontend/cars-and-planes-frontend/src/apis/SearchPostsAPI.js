export const fetchForumPostsBySearch = async (
  content,
  lastEvaluatedKey = null,
  limit = 10
) => {
  const apiURL = process.env.REACT_APP_FORUM_POSTS_BY_SEARCH_URL;
  const queryParams = new URLSearchParams({
    content: content,
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
      throw new Error(`Failed to fetch posts, status: ${response.status}`);
    }

    const result = await response.json();
    return result; // Return the fetched data
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    throw error; // Rethrow or handle the error as needed
  }
};
