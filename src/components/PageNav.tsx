import styled from "styled-components";
import IconButton from "./buttons/IconButton";
import {
  TbArrowBadgeLeft,
  TbArrowBadgeLeftFilled,
  TbArrowBadgeRight,
  TbArrowBadgeRightFilled,
} from "react-icons/tb";
import { useEffect, useState } from "react";

interface PageNavProps {
  page: number;
  totalPage: number;
  isFirst: boolean;
  isLast: boolean;
  shiftToPage: (page: number) => void;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &:nth-child(2) {
    margin: 0 5px;
  }
`;

const PageInput = styled.input`
  width: 50px;
  text-align: end;
  margin-right: 5px;
`;

const ButtonBrace = styled.div`
  width: 28px;
`;

const PageNav = ({
  page,
  totalPage,
  isFirst,
  isLast,
  shiftToPage,
}: PageNavProps) => {
  const [current, setCurrent] = useState<number>(page);

  const handlePage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setCurrent(Number(value));
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const next = current < 0 ? 1 : current > totalPage ? totalPage : current;
      shiftToPage(next);
    }
  };

  useEffect(() => {
    setCurrent(page);
  }, [page]);

  return (
    <Container>
      <Wrapper>
        {isFirst ? (
          <ButtonBrace></ButtonBrace>
        ) : (
          <IconButton
            icon={TbArrowBadgeLeft}
            hoverIcon={TbArrowBadgeLeftFilled}
            size={28}
            onClick={() => shiftToPage(page - 1)}
          />
        )}
      </Wrapper>
      <Wrapper>
        <PageInput
          name="pageInput"
          type="text"
          value={String(current)}
          onChange={handlePage}
          onKeyDown={handleEnter}
        />
        <div>{`/ ${totalPage}`}</div>
      </Wrapper>
      <Wrapper>
        {isLast ? (
          <ButtonBrace></ButtonBrace>
        ) : (
          <IconButton
            icon={TbArrowBadgeRight}
            hoverIcon={TbArrowBadgeRightFilled}
            size={28}
            onClick={() => shiftToPage(page + 1)}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default PageNav;
