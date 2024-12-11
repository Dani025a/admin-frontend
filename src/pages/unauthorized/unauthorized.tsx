import React from "react";
import { useNavigate } from "react-router-dom";
import "./unauthorized.css";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized">
      <h1 className="unauthorized-title">Access Denied</h1>
      <p className="unauthorized-message">
        You do not have permission to view this page.
      </p>
      <button
        className="unauthorized-button"
        onClick={() => navigate("/")}
      >
        Go Back to Home
      </button>
    </div>
  );
}

export default Unauthorized;
