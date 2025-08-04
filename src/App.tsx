import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/styles";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <HelmetProvider>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Header />
        <Outlet />
        <Sidebar isDark={isDark} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
