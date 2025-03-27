import React, { useEffect, useState } from "react";
import { fetchCommentsPost } from "../apis/CommentsAPI";
import NavBar from "../components/NavBar";
import { useParams, useLocation } from "react-router-dom";
import { addComment } from "../apis/AddCommentAPI";

function DetailsPage() {
  const [isFetching, setIsFetching] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const forumPost = location.state?.post;

  const formattedDate = new Date(forumPost.CreatedAt).toLocaleString("en-US", {
    weekday: "long", // e.g., "Monday"
    year: "numeric", // e.g., "2023"
    month: "long", // e.g., "January"
    day: "numeric", // e.g., "1"
    hour: "2-digit", // e.g., "12"
    minute: "2-digit", // e.g., "30"
    second: "2-digit", // e.g., "45"
    hour12: true, // 12-hour format (AM/PM)
  });

  const capitalizeKeys = (obj) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key.charAt(0).toUpperCase() + key.slice(1), // Capitalize key
        value,
      ])
    );
  };

  const handleAddComment = async () => {
    const response = await addComment(forumPost.ForumPostID, comment);
    if (response.ok) {
      const comment = await response.json();
      const formattedComment = capitalizeKeys(comment);
      setComments([formattedComment, ...comments]);
    }
  };

  const loadComments = async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    const response = await fetchCommentsPost(
      JSON.stringify(forumPost.ForumPostID),
      JSON.stringify(lastEvaluatedKey)
    );
    const comments = response.Items;
    setComments((prevComments) => [...prevComments, ...comments]);
    setLastEvaluatedKey(response.LastEvaluatedKey);

    if (!response.LastEvaluatedKey) {
      setHasMore(false);
    }
    setIsFetching(false);
  };

  const handleSeeMoreButton = async () => {
    await loadComments();
  };

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column justify-content-start align-items-center bg-black"
        style={{
          minHeight: "100vh", // Make sure it covers the whole viewport
          width: "100%", // Full width
          paddingTop: "70px", // Push content down to avoid overlapping navbar
          overflow: "auto", // Allow scrolling if content overflows
        }}
      >
        {/* Navbar at the top */}
        <NavBar />

        {/* Main Content Container */}
        <div
          className="bg-black border-dark p-4 rounded"
          style={{
            maxWidth: "800px", // Limit width for better readability
            width: "100%",
          }}
        >
          {/* Post Details */}
          <div className="text-white">
            <h5 className="fw-bold">{forumPost.Username}</h5>
            <p>{forumPost.Content}</p>
            {forumPost.MediaFileURL && (
              <img
                src={forumPost.MediaFileURL}
                alt="Post media"
                className="img-fluid rounded"
                style={{
                  maxWidth: "100%",
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>

          {/* Date Posted */}
          <div className="text-white mt-2">
            <small>Posted on {formattedDate}</small>
          </div>
        </div>

        <div
          className="bg-dark border-light p-4 rounded mt-4 w-100"
          style={{ maxWidth: "800px" }}
        >
          <h5 className="text-white">Comments</h5>

          {/* Add New Comment */}
          <div className="d-flex mt-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="btn btn-outline-light"
              onClick={handleAddComment}
            >
              Post
            </button>
          </div>

          {/* Display Comments */}
          <div className="mt-3">
            {comments.length === 0 && !isFetching ? (
              <p className="text-white">No comments yet.</p>
            ) : (
              comments.map((c, index) => (
                <div key={index} className="border-bottom pb-2 mb-2 text-white">
                  <strong>{c.Username}</strong>
                  <p className="mb-1">{c.Content}</p>
                  <small>{new Date(c.CreatedAt).toLocaleString()}</small>
                </div>
              ))
            )}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <button
              className="btn btn-outline-light mt-3 w-100"
              onClick={loadComments}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "See More Comments"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailsPage;
