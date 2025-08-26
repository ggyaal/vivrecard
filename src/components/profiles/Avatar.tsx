import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const Container = styled.div<{ $size: number; $active: boolean }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  ${({ $active }) => {
    if (!$active) return "";
    return css`
      cursor: pointer;
      transition: all 0.1s ease-in-out;

      &:hover {
        padding: 3px;
        border: 1px solid ${({ theme }) => theme.colors.secondary};
      }
    `;
  }}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Avatar = ({
  to,
  url,
  size = 50,
}: {
  to?: string;
  url: string;
  size?: number;
}) => {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => to && navigate(to)}
      $active={to !== undefined}
      $size={size}
    >
      <Image src={url} alt="Avatar" />
    </Container>
  );
};

export default Avatar;
