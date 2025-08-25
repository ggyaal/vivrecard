import styled from "styled-components";
import { ContentType } from "../types/contentType";
import { formatAmountByContentType } from "../utils/contentUtils";
import { TagColor } from "../styles/styled";

interface AmountTagProps {
  amount: number | null;
  totalAmount: number;
  type: ContentType;
}

const Container = styled.div<{ $color: TagColor }>`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid ${({ $color, theme }) => theme.content.tag[$color].border};
  background-color: ${({ $color, theme }) =>
    theme.content.tag[$color].background};
  color: ${({ $color, theme }) => theme.content.tag[$color].text};
`;

const AmountTag = ({ amount, totalAmount, type }: AmountTagProps) => {
  const color: TagColor =
    !amount || amount === 0
      ? "default"
      : amount === totalAmount
      ? "green"
      : "orange";

  return (
    <Container $color={color}>
      {formatAmountByContentType(amount, totalAmount, type, true)}
    </Container>
  );
};

export default AmountTag;
