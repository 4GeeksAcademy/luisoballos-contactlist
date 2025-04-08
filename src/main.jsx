import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { StoreProvider } from "./hooks/useGlobalReducer.jsx";
import { router } from "./routes.jsx";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
);