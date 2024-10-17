import React, { useState } from "react";
import "./Home.css";
import { solveJakobi, solveCramer, solveGauss } from "../../api/solveMetods";
import { getHistory } from "../../api/history";
import { useAuth } from "../../context/AuthProvider";
import LoginRegisterButton from "../loginOrLogout/LoginRegisterButton";
import LogoutButton from "../loginOrLogout/LogoutButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { token } = useAuth();
  const [activeMethod, setActiveMethod] = useState("");
  const [result, setResult] = useState(null);
  const [coefficients, setCoefficients] = useState("");
  const [results, setResults] = useState("");
  const [requestHistory, setRequestHistory] = useState([]);

  const handleMethodChange = (method) => {
    setActiveMethod((prev) => (prev === method ? "" : method));
  };

  const handleSolve = async (e) => {
    e.preventDefault();

    if (!activeMethod) {
      toast.error("Please select a method.");
      return;
    }

    try {
      const parsedCoefficients = JSON.parse(coefficients);
      const parsedResults = JSON.parse(results);

      if (parsedCoefficients.length >= 11) {
        toast.error("Too many equasions");
        throw new Error();
      }

      if (parsedResults.length >= 11) {
        toast.error("Too many results");
        throw new Error();
      }
      let response;
      if (activeMethod === "Jakobi")
        response = await solveJakobi(parsedCoefficients, parsedResults);
      if (activeMethod === "Cramer")
        response = await solveCramer(parsedCoefficients, parsedResults);
      if (activeMethod === "Gauss")
        response = await solveGauss(parsedCoefficients, parsedResults);

      setResult(response.data);
    } catch (err) {
      toast.error("Failed to solve method.");
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await getHistory();
      setRequestHistory(response.data);
    } catch (error) {
      toast.error("Failed to refresh request history. Please try again.");
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="project-title">Equation Solver</div>
        <div className="header-buttons">
          {token ? <LogoutButton /> : <LoginRegisterButton />}
        </div>
      </header>
      <div className="content">
        {/* Ліва панель історії */}
        <div className="request-history">
          <h2>Request History</h2>
          <button className="button refresh-btn" onClick={handleRefresh}>
            Refresh
          </button>
          <div className="history-list">
            {requestHistory.map((req) => (
              <div key={req._id} className="history-item">
                <p>{req.description}</p>
                <p>Result:</p>
                {Array.isArray(req.outputResult) ? (
                  req.outputResult.map((result, index) => (
                    <p key={index}>{result}</p>
                  ))
                ) : (
                  <p>{req.outputResult}</p>
                )}
                <p>Complexity:</p>
                <p>{req.outputComplexity}</p>
                <small>{new Date(req.timestamp).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Права панель */}
        <div className="solver-panel">
          {/* Основна частина з полями вводу */}
          <div className="solver-main">
            <div className="method-buttons">
              {["Jakobi", "Cramer", "Gauss"].map((method) => (
                <button
                  key={method}
                  className={`method-btn ${
                    activeMethod === method ? "active" : ""
                  }`}
                  onClick={() => handleMethodChange(method)}
                >
                  {method}
                </button>
              ))}
            </div>

            <div className="input-area">
              <label htmlFor="coefficients">Coefficients:</label>
              <textarea
                id="coefficients"
                className="coefficients-textarea"
                value={coefficients}
                onChange={(e) => setCoefficients(e.target.value)}
                required
                placeholder="Enter your coefficients as JSON, e.g. [[5, -2, 3], [3, 8, -4], ...]"
              />
              <label htmlFor="results">Results vector:</label>
              <textarea
                id="results"
                className="results-textarea"
                value={results}
                onChange={(e) => setResults(e.target.value)}
                required
                placeholder="Enter your results as JSON, e.g. [24, 15, 30, ...]"
              />
              <button className="button solve-btn" onClick={handleSolve}>
                Solve
              </button>
            </div>
          </div>

          {/* Панель результатів */}
          {result && (
            <div className="result-panel">
              <h3>Results:</h3>
              <pre>{JSON.stringify(result.result, null, 2)}</pre>
              <h4>Complexity:</h4>
              <p>{result.complexity}</p>
            </div>
          )}
        </div>
      </div>
      <footer className="footer">WebUniProject</footer>
      <ToastContainer />{" "}
    </div>
  );
};

export default App;
