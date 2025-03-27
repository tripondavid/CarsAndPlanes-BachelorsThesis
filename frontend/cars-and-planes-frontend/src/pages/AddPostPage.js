import React, { useState } from "react";
import { addPost } from "../apis/AddPostAPI";

function AddPostPage() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleAddPost = async () => {
    try {
      if (!image) {
        const response = await addPost(content);
      } else {
        const response = await addPost(content, image);
      }
    } catch (error) {}
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-black">
      <div className="bg-dark p-4 rounded shadow-lg" style={{ width: "400px" }}>
        <a className="navbar-brand" href="/forumPosts">
          <h2 className="text-center text-white mb-4">Cars&Planes</h2>
        </a>

        {/* Content Input */}
        <div className="mb-3">
          <label htmlFor="content" className="form-label bg-dark text-white">
            Content
          </label>
          <textarea
            id="content"
            className="form-control bg-dark text-white"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your post content"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mb-3 bg-dark text-white">
          <label htmlFor="image" className="form-label bg-dark text-white">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            className="form-control bg-dark text-white"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleAddPost}
            className="btn btn-light w-100"
          >
            Submit Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPostPage;
