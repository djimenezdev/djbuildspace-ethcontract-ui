import "./App.css";
import Home from "@comp/Wave/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Email from "@comp/Email/Email";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/email" element={<Email />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
