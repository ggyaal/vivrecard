import {
  RiEmotionFill,
  RiEmotionHappyFill,
  RiEmotionNormalFill,
  RiEmotionUnhappyFill,
  RiEmotionSadFill,
} from "react-icons/ri";
import styled from "styled-components";
import { TagColor } from "../styles/styled";
import { IconType } from "react-icons";

const Container = styled.div<{ $color: TagColor }>`
  color: ${({ $color, theme }) => theme.content.tag[$color].text};
  font-weight: 600;
`;

const Recommend = ({
  recommended,
  size,
}: {
  recommended: number;
  size: number;
}) => {
  let Icon: IconType;
  let color: TagColor = "default";

  switch (recommended) {
    case -2:
      Icon = RiEmotionSadFill;
      color = "red";
      break;
    case -1:
      Icon = RiEmotionUnhappyFill;
      color = "orange";
      break;
    case 1:
      Icon = RiEmotionHappyFill;
      color = "green";
      break;
    case 2:
      Icon = RiEmotionFill;
      color = "blue";
      break;
    default:
      Icon = RiEmotionNormalFill;
      color = "default";
      break;
  }

  return (
    <Container $color={color}>
      <Icon size={size} />
    </Container>
  );
};

export default Recommend;
