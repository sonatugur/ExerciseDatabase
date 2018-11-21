import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { purple, yellow, dark } from "@material-ui/core/colors";

import "./styles.css";
const theme = createMuiTheme({
  palette: {
    primary: purple,
    type: dark
  },
  spacing: {
    unit: 10
  }
});
const rootElement = document.getElementById("root");
ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  rootElement
);
