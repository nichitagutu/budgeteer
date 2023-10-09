import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";

import { AppThemes } from "./themes";
import { ThemeType } from "./types";

import "./App.css";

function App() {
  let initialTheme: ThemeType = "auto";
  if (window.Telegram.WebApp.headerColor === undefined) {
    initialTheme = "day-iOS";
  }

  const [theme, setTheme] = useState<ThemeType>(initialTheme);

  return (
    <ThemeProvider theme={AppThemes[theme]}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/start" element={<StartPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
