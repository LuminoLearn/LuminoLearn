import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot for React 18+
import "./index.css";
import App from "./App";

// Create the root and render the app
const root = ReactDOM.createRoot(document.getElementById("root")); // Correct rendering method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
