import { IconType } from "react-icons";
import styled from "styled-components";

interface IconImageProps {
  background: string;
  Icon: IconType;
  size: number;
}

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "background",
})<{
  background: string;
}>`
  background-color: ${({ background }) => background};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImage = ({ background, Icon, size }: IconImageProps) => {
  return (
    <Container background={background}>
      <Icon size={size} />
    </Container>
  );
};

export default IconImage;
