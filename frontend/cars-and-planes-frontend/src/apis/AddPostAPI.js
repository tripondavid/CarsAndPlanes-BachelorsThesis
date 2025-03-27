export const addPost = async (content = null, mediaFile) => {
  let response = "";
  let mediaFileURL = "";
  if (mediaFile != null) {
    response = await requestPresignedURLForMediaFile(mediaFile);
    await uploadFile(mediaFile, response.uploadURL, response.finalFileName);
    mediaFileURL = await generateFileURL(response.finalFileName);
  }

  const apiURL = process.env.REACT_APP_ADD_POST_URL;
  const body = {
    content: content,
    mediaFileURL: mediaFileURL != "" ? mediaFileURL : null,
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
      throw new Error(`Failed to add post, status: ${response.status}`);
    }

    const result = await response.json();

    return result; // Return the fetched data
  } catch (error) {
    console.error("Error while adding post:", error);
    //return error;
    throw error; // Rethrow or handle the error as needed
  }
};

const requestPresignedURLForMediaFile = async (mediaFile) => {
  const apiURL = process.env.REACT_APP_FORUM_POSTS_PRESIGNED_URL;

  const fileName = mediaFile.name;
  const fileType = mediaFile.type;
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
      throw new Error(`Failed to fetch posts, status: ${response.status}`);
    }

    const result = await response.json();
    return result; // Return the fetched data
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    throw error; // Rethrow or handle the error as needed
  }
};

const uploadFile = async (mediaFile, uploadURL, finalFileName) => {
  const method = "PUT";
  const headers = {
    "Content-Type": mediaFile.type,
  };

  const renamedFile = new File([mediaFile], finalFileName, {
    type: mediaFile.type,
  });
  console.log(renamedFile);

  try {
    const response = await fetch(uploadURL, {
      method: method,
      headers: headers,
      body: renamedFile, // The actual file content
    });

    // Check if the upload was successful
    if (!response.ok) {
      throw new Error(`Failed to upload file, status: ${response.status}`);
    }

    console.log("File uploaded successfully.");
    return uploadURL; // The presigned URL is now the file's accessible URL
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Rethrow the error for handling in the caller function
  }
};

const generateFileURL = async (fileName) => {
  return process.env.REACT_APP_S3_BUCKET_URL + fileName;
};
