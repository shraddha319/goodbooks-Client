import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/index";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="Main">
        <Routes></Routes>
      </div>
    </div>
  );
}
