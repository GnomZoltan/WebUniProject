import React from "react";
import { useState } from "react";
import "./Home.css";
import { getAll } from "../../api/auth";

function App() {
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await getAll();

      console.log(response.data);
    } catch (err) {
      setError("No get data");
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="auth-buttons">
        <button className="header-button">Login</button>
        <button className="header-button">Register</button>
      </div>
      <main className="App-main">
        <button className="get-all-button" onClick={handleSubmit}>
          Get All
        </button>
      </main>
    </div>
  );
}

export default App;
