import styled from "styled-components";

interface SelectTagProps {
  name: string;
  isSelect: boolean;
  onClick: () => void;
}

const Container = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isSelect",
})<{ isSelect: boolean }>`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: ${({ isSelect, theme }) =>
    isSelect ? theme.colors.primary : theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SelectTag = ({ name, isSelect, onClick }: SelectTagProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick();
  };

  return (
    <Container isSelect={isSelect} onClick={handleClick}>
      {name}
    </Container>
  );
};

export default SelectTag;
