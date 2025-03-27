import React from "react";
import { useNavigate } from "react-router-dom";

function PostCard(post) {
  const navigate = useNavigate();
  const formattedDate = new Date(post.CreatedAt).toLocaleString("en-US", {
    weekday: "long", // e.g., "Monday"
    year: "numeric", // e.g., "2023"
    month: "long", // e.g., "January"
    day: "numeric", // e.g., "1"
    hour: "2-digit", // e.g., "12"
    minute: "2-digit", // e.g., "30"
    second: "2-digit", // e.g., "45"
    hour12: true, // 12-hour format (AM/PM)
  });

  const onSeeDetails = () => {
    navigate(`/forumPosts/comments/${post.ForumPostID}`, { state: { post } });
  };

  return (
    <div
      className="card mb-3 navbar-dark bg-black border-dark rounded-lg"
      style={{
        width: "100%",
        maxWidth: "700px",
        position: "relative", // Allow absolute positioning of the button
        display: "flex",
        flexDirection: "column", // Ensure that content and button stack vertically
        paddingBottom: "50px", // Give space for the button at the bottom
      }}
    >
      <div className="card-body text-white" style={{ flexGrow: 1 }}>
        <h5 className="card-title">{post.Username}</h5>
        <p className="card-text">{post.Content}</p>
        {post.MediaFileURL && (
          <img
            src={post.MediaFileURL}
            alt="Post media"
            className="img-fluid rounded"
            style={{
              maxWidth: "100%",
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      {/* Button Positioned in the Bottom Right */}
      <button
        className="btn btn-outline-light"
        onClick={() => onSeeDetails()}
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          zIndex: 1, // Ensure it stays on top of the card content
        }}
      >
        See Details
      </button>
      <div
        className="card-footer text-white"
        style={{
          fontSize: "14px",
          textAlign: "left",
          paddingTop: "10px",
        }}
      >
        Posted on {formattedDate}
      </div>
    </div>
  );
}

export default PostCard;
