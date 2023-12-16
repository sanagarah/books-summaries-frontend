import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://books-backend-m4slaxoduq-uc.a.run.app/api/users/login",
        credentials
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", credentials.username);
      toast.success("Logged in successfully!");
      login(credentials.username, response.data.token);
      navigate("/");
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </