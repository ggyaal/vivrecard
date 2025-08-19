import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  borderRadius: "5px",
  colors: {
    primary: "#4e5362ff",
    secondary: "#7A5A2F",
    sidebar: "#2B2E4A",
    background: "#202020",
    text: "#CCCCCC",
    paleText: "#A0A0A0",
    shadow: "rgba(255, 255, 255, 0.3)",
    error: "#BC2F2F",
  },
  content: {
    background: "#1c1c1c",
    text: "#FFF",
    subtext: "#ccc",
    star: "#eded91",
    block: {
      background: "#333",
      text: "#FFF",
    },
    tag: {
      primary: "#276eac",
      secondary: "#6a819a",
      text: "#FFF",
    },
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
    paleText: "#7a7a7a",
    shadow: "rgba(0, 0, 0, 0.3)",
    error: "#C83B3B",
  },
  content: {
    background: "#FFF",
    text: "#1C1C1C",
    subtext: "#ccc",
    star: "#cfcf73",
    block: {
      background: "#e9ecef",
      text: "#303030",
    },
    tag: {
      primary: "#b3dcff",
      secondary: "#6fb4ff",
      text: "#FFF",
    },
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
