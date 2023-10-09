import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";

import { AppThemes } from "./themes";
import { ThemeType } from "./types";

import "./App.css";
import { API_URL } from "./constants";
import axios from "axios";

function App() {
  let initialTheme: ThemeType = "auto";
  if (window.Telegram.WebApp.headerColor === undefined) {
    initialTheme = "day-iOS";
  }

  const [theme, setTheme] = useState<ThemeType>(initialTheme);

  // const initData = window.Telegram.WebApp.initData;
  // const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
  // const user = initDataUnsafe.user;

  // async function addNewUser(user: any) {
  //   const response = await axios.post(
  //     `${API_URL}/users`,
  //     {
  //       telegram_id: user.id,
  //       username: user.username,
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       language_code: user.language_code,
  //     },
  //     {
  //       params: {
  //         initData,
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //         "ngrok-skip-browser-warning": "lmao",
  //       },
  //     }
  //   );

  //   const transactions = response.data;
  //   return transactions;
  // }

  // useEffect(() => {
  //   addNewUser(user);
  // }, []);

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
