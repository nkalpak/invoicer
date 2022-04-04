import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, ThemeProvider } from "@mui/material";
import { ReactLocationProvider } from "./lib/react-location";
import { ReactQueryProvider } from "./lib/react-query";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { IntlProvider } from "react-intl";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#007EA7",
    },
    primary: {
      main: "#003249",
    },
  },
  typography: {
    fontFamily: "Fira Sans",
  },
});

function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProvider>
      <ReactLocationProvider>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <IntlProvider locale="en-US">{children}</IntlProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </ReactLocationProvider>
    </ReactQueryProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
