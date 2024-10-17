import React from "react";
import { useNavigate } from "react-router-dom";
import "../home/Home.css";

const LoginRegisterButton = () => {
  const navigate = useNavigate();

  return (
    <div className="header-buttons">
      <button className="button" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="button" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

export default LoginRegisterButton;
