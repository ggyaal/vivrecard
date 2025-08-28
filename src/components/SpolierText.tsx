import { ReactNode, useState } from "react";
import styled from "styled-components";
import CheckBox from "./CheckBox";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Msg = styled.div<{ $show: boolean }>`
  filter: ${({ $show }) => ($show ? "none" : "blur(4px) brightness(0)")};
`;

const SpoilerText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <Container className={className}>
      <CheckBox size={15} fontSize={12} checked={show} setChecked={setShow}>
        스포일러 보기
      </CheckBox>
      <Msg $show={show}>{children}</Msg>
    </Container>
  );
};

export default SpoilerText;
