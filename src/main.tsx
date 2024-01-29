import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";

import "./index.css";
// import Bank from "./components/Bank";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    {/* <Bank /> */}
  </React.StrictMode>
);
