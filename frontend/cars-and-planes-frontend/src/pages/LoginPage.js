import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../apis/LoginAPI";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const error = "Login failed. Please try again.";
  const navigate = useNavigate();

  const handleOnLogin = async () => {
    try {
      const response = await loginRequest(username, password);
      navigate("/forumPosts");
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-black">
      <div className="container bg-black rounded w-25 p-3 text-white font-monospace">
        <form onSubmit={handleOnLogin}>
          <div className="form-group pt-1 pb-2">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              className="form-control"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group pt-1 pb-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleOnLogin}
            className="btn btn-light mt-4 w-100 p-2"
          >
            Login
          </button>
        </form>

        {showError && (
          <p className="d-flex m-2 justify-content-center align-items-center">
            {error}
          </p>
        )}

        <div className="d-flex m-2 justify-content-center align-items-center">
          <p className="text-white mt-3">No Account?</p>
          <Link to="/users/register" className="btn btn-link text-white">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
