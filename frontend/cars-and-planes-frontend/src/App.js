import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import RegisterPage from "./pages/RegisterPage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import AddPostPage from "./pages/AddPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import DetailsPage from "./pages/DetailsPage";
import SearchPostsPage from "./pages/SearchPostsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/users/register" />} />
        <Route path="/forumPosts" element={<MainPage />} />
        <Route path="/forumPosts/add-post" element={<AddPostPage />} />
        <Route path="/forumPosts/my-posts" element={<MyPostsPage />} />
        <Route path="/forumPosts/search-posts" element={<SearchPostsPage />} />
        <Route
          path="/forumPosts/comments/:ForumPostID"
          element={<DetailsPage />}
        />
        <Route path="/users/register" element={<RegisterPage />} />
        <Route path="/users/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
