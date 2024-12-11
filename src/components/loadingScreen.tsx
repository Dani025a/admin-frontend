import React from "react";
import './loadingScreen.css'



function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      <h1>Loading...</h1>
    </div>
  );
}

export default LoadingScreen;
