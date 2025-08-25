import styled from "styled-components";
import { PiStarFill, PiStarHalfFill, PiStar } from "react-icons/pi";

interface StarSelectorProps {
  count?: number;
  value?: number;
  size?: number;
  setValue?: (value: number) => void;
}

const Container = styled.div`
  color: ${({ theme }) => theme.colors.paleText};
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StarButton = styled.button<{ size?: number }>`
  ${({ size }) => size && `width: ${size}px; height: ${size}px;`}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    position: absolute;
  }

  & > svg:nth-child(2) {
    color: ${({ theme }) => theme.content.star};
    z-index: -1;
  }
`;

const Score = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
`;

const StarSelector = ({
  count = 5,
  value = 0,
  size,
  setValue,
}: StarSelectorProps) => {
  return (
    <Container>
      {Array.from({ length: count }, (_, index) => {
        const loopCount = Math.round(value);
        const isHalf = value % 1 >= 0.5;
        return (
          <StarButton
            size={size}
            key={index}
            onClick={() => {
              if (value === index + 1) {
                setValue?.(index + 0.5);
              } else if (value === index + 0.5) {
                setValue?.(index);
              } else {
                setValue?.(index + 1);
              }
            }}
          >
            <PiStar size={size} />
            {index < loopCount &&
              (index === loopCount - 1 && isHalf ? (
                <PiStarHalfFill size={size} />
              ) : (
                <PiStarFill size={size} />
              ))}
          </StarButton>
        );
      })}
      <Score>({value})</Score>
    </Container>
  );
};

export default StarSelector;
