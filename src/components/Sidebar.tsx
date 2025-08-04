import { HiHome, HiOutlineHome, HiSun } from "react-icons/hi";
import { HiMoon } from "react-icons/hi2";
import styled from "styled-components";
import IconButton from "./IconButton";
import { Link } from "react-router-dom";

interface SidebarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

interface MenuItemProps {
  under?: boolean;
}

const Container = styled.div`
  width: 80px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.sidebar};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1010;
`;

const MenuItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "under",
})<MenuItemProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${({ under }) => (under ? "auto" : undefined)};
  align-items: center;
  padding: 30px 10px;
  color: ${({ theme }) => theme.colors.text};
  justify-self: flex-end;
  cursor: pointer;
  transition: color 0.3s ease;
`;

const Sidebar = ({ isDark, toggleTheme }: SidebarProps) => {
  const ThemeIcon = isDark ? HiMoon : HiSun;

  return (
    <Container>
      <MenuItem>
        <Link to="/">
          <IconButton
            icon={HiOutlineHome}
            hoverIcon={HiHome}
            size={28}
            ariaLabel="Menu"
            onClick={() => console.log("Menu Clicked")}
          />
        </Link>
      </MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem onClick={toggleTheme} under>
        <ThemeIcon size={28} />
      </MenuItem>
    </Container>
  );
};

export default Sidebar;
