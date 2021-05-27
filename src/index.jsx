import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ProductsProvider,
  UserDataProvider,
  FeedbackProvider,
} from "./contexts/index";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <Router>
      <FeedbackProvider>
        <ProductsProvider>
          <UserDataProvider>
            <App />
          </UserDataProvider>
        </ProductsProvider>
      </FeedbackProvider>
    </Router>
  </StrictMode>,
  document.getElementById("root")
);
