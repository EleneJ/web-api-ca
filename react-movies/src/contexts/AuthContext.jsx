import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Replace this with your actual API base URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/users";

  const signup = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Signup failed");

      const data = await response.json();
      setUser(data.user); // assuming API responds with { user: ... }
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const login = async (username, password) => {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.success) {
      localStorage.setItem('token', data.token);
      setUser({ username }); // or however you track logged-in user state
      return true;
    }
    return false;
  } catch (error) {
    console.error("Login error:", error);
    return false;
  }
};

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext; // ✅ ADD THIS LINE