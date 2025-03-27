import React, { useEffect, useState } from "react";
import { fetchForumPosts } from "../apis/ForumPostsAPI";
import PostCard from "../components/PostCard";
import NavBar from "../components/NavBar";

function MainPage() {
  const [forumPosts, setForumPosts] = useState([]);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadForumPosts = async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    const response = await fetchForumPosts(JSON.stringify(lastEvaluatedKey));
    const posts = response.Items;
    setForumPosts((prevPosts) => [...prevPosts, ...posts]);
    setLastEvaluatedKey(response.LastEvaluatedKey);

    if (!response.LastEvaluatedKey) {
      setHasMore(false);
    }
    setIsFetching(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 10
    ) {
      loadForumPosts();
    }
  };

  useEffect(() => {
    loadForumPosts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up
  }, [isFetching, hasMore]);

  return (
    <>
      <NavBar />
      <div
        className="d-flex flex-column justify-content-center align-items-center bg-black"
        style={{ paddingTop: "100px", minHeight: "100vh" }}
      >
        {forumPosts.map((post) => (
          <PostCard key={post.ForumPostID} {...post} />
        ))}
        {isFetching && (
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        )}
      </div>
    </>
  );
}

export default MainPage;
