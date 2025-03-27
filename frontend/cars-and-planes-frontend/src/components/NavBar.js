import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const addButton = () => {
    navigate("/forumPosts/add-post");
  };

  const myPostsButton = () => {
    navigate("/forumPosts/my-posts");
  };

  const searchButton = () => {
    navigate(`/forumPosts/search-posts?content=${content}`);
  };

  return (
    <nav className="navbar navbar-dark bg-black justify-content-between px-3 fixed-top">
      <a
        className="navbar-brand d-flex align-items-center text-white"
        href="/forumPosts"
      >
        <i className="fas fa-car mr-2"></i> {/* Font Awesome car icon */}
        <h4 className="text-center text-white">Cars&Planes</h4>
      </a>
      <form className="form-inline d-flex mx-auto">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={content}
          onChange={setContent}
        />
        <button
          className="btn btn-outline-light my-2 my-sm-0 ms-2"
          onClick={searchButton}
        >
          Search
        </button>
      </form>
      <button
        className="btn btn-outline-light my-2 my-sm-0 me-2"
        onClick={myPostsButton}
      >
        My posts
      </button>
      <button
        className="btn btn-outline-light my-2 my-sm-0"
        onClick={addButton}
      >
        Add Post
      </button>
    </nav>
  );
}

export default NavBar;
