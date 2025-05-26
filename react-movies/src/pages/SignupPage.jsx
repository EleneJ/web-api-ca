import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/users?action=register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      // This handles unexpected empty or invalid JSON from backend
      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid JSON response: " + text);
      }

      if (data.success) {
        alert("Registration successful! You can now log in.");
        navigate("/login");
      } else {
        alert(data.msg || "Registration failed.");
      }
    } catch (error) {
      alert("Registration error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpPage;
