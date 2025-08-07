import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  borderRadius: "5px",
  colors: {
    primary: "#4e5362ff",
    secondary: "#7A5A2F",
    sidebar: "#2B2E4A",
    background: "#202020",
    text: "#CCCCCC",
    shadow: "rgba(255, 255, 255, 0.3)",
  },
  discord: {
    background: "#1F1F1F",
    text: "#c8c8c8ff",
  },
  google: {
    background: "#131314",
    text: "#E3E3E3",
  },
};

export const lightTheme: DefaultTheme = {
  borderRadius: "5px",
  colors: {
    primary: "#98A1BC",
    secondary: "#DED3C4",
    sidebar: "#555879",
    background: "#DFDFDF",
    text: "#2a2a3b",
    shadow: "rgba(0, 0, 0, 0.3)",
  },
  discord: {
    background: "#5865F2",
    text: "#FFFFFF",
  },
  google: {
    background: "#FFFFFF",
    text: "#1F1F1F",
  },
};
