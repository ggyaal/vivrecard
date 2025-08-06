import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/styles";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { HelmetProvider } from "react-helmet-async";

const Layout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 80px 1fr;
  height: 100vh;
`;

const SidebarBrace = styled.div``;

const Main = styled.div`
  position: relative;
`;

function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <HelmetProvider>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyles />
        <Layout>
          <SidebarBrace></SidebarBrace>
          <Main>
            <Header />
            <Outlet />
          </Main>
        </Layout>
        <Sidebar isDark={isDark} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
