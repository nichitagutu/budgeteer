import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import StartPage from "./pages/StartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/start" element={<StartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
