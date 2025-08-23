import styled from "styled-components";
import { TagColor } from "../styles/styled";

interface SelectTagProps {
  name: string;
  isSelect: boolean;
  color?: TagColor;
  selectColor?: TagColor;
  onClick: () => void;
}

const Container = styled.button<{
  $isSelect: boolean;
  $color: TagColor;
  $selectColor: TagColor;
}>`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: ${({ $isSelect, $color, $selectColor, theme }) =>
    $isSelect
      ? theme.content.tag[$selectColor].background
      : theme.content.tag[$color].background};
  color: ${({ $isSelect, $color, $selectColor, theme }) =>
    $isSelect
      ? theme.content.tag[$selectColor].text
      : theme.content.tag[$color].text};

  &:hover {
    background-color: ${({ $selectColor, theme }) =>
      theme.content.tag[$selectColor].background};
  }
`;

const SelectTag = ({
  name,
  isSelect,
  color = "sky",
  selectColor = "blue",
  onClick,
}: SelectTagProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  return (
    <Container
      $isSelect={isSelect}
      $color={color}
      $selectColor={selectColor}
      onClick={handleClick}
    >
      {name}
    </Container>
  );
};

export default SelectTag;
