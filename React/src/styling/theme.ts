import { createTheme, responsiveFontSizes } from "@mui/material";

// adding a new custom colour variable
declare module "@mui/material/styles" {
  interface Theme {
    highlightOne: { main: string };
  }
  interface ThemeOptions {
    highlightOne?: { main?: string };
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: "#073B4C",
      light: "#06D6A0",
    },
    secondary: {
      main: "#FFF",
    },
  },
  highlightOne: {
    main: "#EF476F",
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

// adjust based on the predefined breakpoints
theme = responsiveFontSizes(theme);

export default theme;
