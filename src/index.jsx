import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductsProvider } from "./contexts/index";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <ProductsProvider>
      <Router>
        <App />
      </Router>
    </ProductsProvider>
  </StrictMode>,
  document.getElementById("root")
);
