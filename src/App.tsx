import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
