export const fetchPresignedUrl = async (fileName, fileType) => {
  const apiURL = process.env.REACT_APP_MEDIA_UPLOAD_PRESIGNED_URL;
  const queryParams = new URLSearchParams({
    fileName: fileName,
    fileType: fileType,
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
        `Failed to fetch presigned url for media upload: ${response.status}`
      );
    }

    const result = await response.json();
    return result; // Return the fetched data
  } catch (error) {
    console.error("Error generating presigned url for media upload:", error);
    throw error;
  }
};
