import { IconType } from "react-icons";
import styled from "styled-components";

interface IconImageProps {
  background: string;
  width: number;
  height: number;
  Icon: IconType;
  size: number;
}

const Container = styled.div<{
  width: number;
  height: number;
  background: string;
}>`
  background-color: ${({ background }) => background};
  width: ${({ width }) => width + "px"};
  height: ${({ height }) => height + "px"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImage = ({
  background,
  width,
  height,
  Icon,
  size,
}: IconImageProps) => {
  return (
    <Container width={width} height={height} background={background}>
      <Icon size={size} />
    </Container>
  );
};

export default IconImage;
