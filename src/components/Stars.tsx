import styled from "styled-components";
import { FaStar, FaStarHalf } from "react-icons/fa";

const Container = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isHalf",
})<{ isHalf?: boolean }>`
  &:first-child {
    color: ${({ theme }) => theme.content.star};
    margin-right: ${({ isHalf }) => (!isHalf ? "5px" : undefined)};
  }
`;

const Score = styled.div<{ $size: number }>`
  font-size: ${({ $size }) => $size}px;
`;

const Stars = ({
  score,
  size = 32,
  showScore = false,
  fontSize = 16,
}: {
  score: number;
  size?: number;
  showScore?: boolean;
  fontSize?: number;
}) => {
  const loop = Math.round(score);
  const isHalf = (Math.round(score * 100) / 100) % 1 >= 0.5;
  return (
    <Container>
      <Wrapper isHalf={isHalf}>
        {Array.from({ length: loop }).map((_, i) => {
          return i === loop - 1 && isHalf ? (
            <FaStarHalf key={`star_${i}`} size={size} />
          ) : (
            <FaStar key={`star_${i}`} size={size} />
          );
        })}
      </Wrapper>
      {showScore && (
        <Wrapper isHalf={isHalf}>
          <Score $size={fontSize}>{score.toFixed(2)}</Score>
        </Wrapper>
      )}
    </Container>
  );
};

export default Stars;
