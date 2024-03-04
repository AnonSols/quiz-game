import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";

import "./index.css";
import { QuestionProvider } from "./context/questionContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuestionProvider>
      <App />
    </QuestionProvider>
  </React.StrictMode>
);
