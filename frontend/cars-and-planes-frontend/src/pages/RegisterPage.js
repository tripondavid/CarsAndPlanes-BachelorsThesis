import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerRequest } from "../apis/RegisterAPI";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = "Registration failed. Please try again.";
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleOnRegister = async () => {
    const response = await registerRequest(email, username, password);
    if (response.ok) {
      navigate("/users/login");
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100 bg-black">
      <div className="container bg-black rounded w-25 p-3 text-white font-monospace">
        <div className="form-group pt-1 pb-2">
          <label for="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group pt-1 pb-2">
          <label for="username">Username</label>
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
          <label for="password">Password</label>
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
          onClick={handleOnRegister}
          className="btn btn-light mt-4 w-100 p-2"
        >
          Register
        </button>
        {showError && (
          <p className="d-flex m-2 justify-content-center align-items-center">
            {error}
          </p>
        )}

        <div className="d-flex m-2 justify-content-center align-items-center">
          <p className="text-white mt-3">Already have an account?</p>
          <Link to="/users/login" className="btn btn-link text-white">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
