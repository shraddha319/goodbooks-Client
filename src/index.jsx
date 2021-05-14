import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductsProvider } from "./contexts/index";
import App from "./App";

ReactDOM.render(
  <StrictMode>
    <Router>
      <ProductsProvider>
        <App />
      </ProductsProvider>
    </Router>
  </StrictMode>,
  document.getElementById("root")
);
