import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/styles";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { HelmetProvider } from "react-helmet-async";
import useMember from "./hooks/useMember";
import {
  changeThemeByName,
  getTheme,
  getThemeByName,
  lazyUpdateOrCreateTheme,
} from "./api/backend/theme";

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
  const [theme, setTheme] = useState<string>("dark");
  const { data: member, isLoading } = useMember();
  const toggleTheme = () => {
    const name = changeThemeByName(theme);
    if (member) lazyUpdateOrCreateTheme(member.id, name);
    setTheme(name);
  };

  useEffect(() => {
    if (!isLoading && !member) {
      setTheme("light");
    }

    if (!member) return;

    (async () => {
      setTheme(await getTheme(member.id));
    })();
  }, [member, isLoading]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={getThemeByName(theme)}>
        <GlobalStyles />
        <Layout>
          <SidebarBrace></SidebarBrace>
          <Main>
            <Header />
            <Outlet />
          </Main>
        </Layout>
        <Sidebar theme={theme} toggleTheme={toggleTheme} />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
