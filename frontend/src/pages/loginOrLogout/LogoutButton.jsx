import React from "react";
import "../home/Home.css";
import { useAuth } from "../../context/AuthProvider";
import { logout } from "../../api/auth";

const LogoutButton = () => {
  const { token, setToken } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await logout();
      setToken("");
    } catch (err) {
      console.error("Failed to solve method.");
    }
  };

  return (
    <div className="header-buttons">
      <button className="button" onClick={handleClick}>
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;
