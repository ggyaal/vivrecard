import styled from "styled-components";
import { FaStar, FaStarHalf } from "react-icons/fa";

const Container = styled.div`
  margin: 15px 0;
  display: flex;
  align-items: flex-end;
`;

const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isHalf",
})<{ isHalf?: boolean }>`
  &:first-child {
    color: #eded91;
    margin-right: ${({ isHalf }) => (!isHalf ? "5px" : undefined)};
  }
`;

const Score = styled.div`
  font-size: 16px;
`;

const Stars = ({
  score,
  showScore = false,
}: {
  score: number;
  showScore?: boolean;
}) => {
  const loop = Math.round(score);
  const isHalf = (Math.round(score * 100) / 100) % 1 >= 0.5;
  return (
    <Container>
      <Wrapper isHalf={isHalf}>
        {Array.from({ length: loop }).map((_, i) => {
          return i === loop - 1 && isHalf ? (
            <FaStarHalf key={`star_${i}`} size={32} />
          ) : (
            <FaStar key={`star_${i}`} size={32} />
          );
        })}
      </Wrapper>
      {showScore && (
        <Wrapper isHalf={isHalf}>
          <Score>{score.toFixed(2)}</Score>
        </Wrapper>
      )}
    </Container>
  );
};

export default Stars;
