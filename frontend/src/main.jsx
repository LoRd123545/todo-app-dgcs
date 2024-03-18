import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { KeycloakProvider } from "keycloak-react-web";
import Keycloak from "keycloak-js";

import App from "./App";
import keycloak from "./keycloak.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <ReactKeycloakProvider authClient={keycloak}>
        <App />
      </ReactKeycloakProvider> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
