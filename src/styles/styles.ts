import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  ${reset}

  input, button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    font: inherit;
    color: inherit;
    outline: none;
    appearance: none;
  }

  * {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    box-sizing: border-box;
  }
  
  body {
    min-width: 800px;
    background-color: ${({ theme }) => theme.colors.background};
    font-family: "Noto Sans KR", sans-serif;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    cursor: default;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    cursor: pointer;
  }

`;
