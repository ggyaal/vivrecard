import { ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface HamburgerMenuProps {
  ButtonNode: (props: { onClick: () => void }) => ReactElement;
  Items: ReactElement[];
}

interface DropdownMenuProps {
  isOpen: boolean;
  childrenCount: number;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Menu = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isOpen", "childrenCount"].includes(prop),
})<DropdownMenuProps>`
  position: absolute;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.sidebar};
  width: 100px;
  height: ${({ childrenCount }) =>
    childrenCount > 0 ? `${childrenCount * 45}px` : "0"};
  padding: 10px 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  top: 40px;
`;

const MenuItem = styled.div`
  width: 100%;
  padding: 10px 20px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const HamburgerMenu = ({ ButtonNode, Items }: HamburgerMenuProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Container>
      <ButtonNode onClick={() => setIsOpen(!isOpen)} />
      <Menu ref={menuRef} isOpen={isOpen} childrenCount={Items.length}>
        {Items.map((Item, index) => (
          <MenuItem key={index} onClick={() => setIsOpen(false)}>
            {Item}
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
};

export default HamburgerMenu;
