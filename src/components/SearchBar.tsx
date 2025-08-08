import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.colors.sidebar};
  border-radius: 30px;
  min-width: 500px;
  box-shadow: 0 5px 10px ${({ theme }) => theme.colors.shadow};
`;

const Wrapper = styled.div`
  &:first-child {
    flex: 1;
    margin-right: 10px;
  }
`;

const Input = styled.input`
  width: 100%;
  color: ${({ theme }) => theme.colors.text};
`;

const Button = styled.button`
  color: ${({ theme }) => theme.colors.primary};
  transition: all 0.1s ease-in-out;

  &:hover {
    filter: brightness(0.2);
  }
`;

const ErrorMsg = styled.div`
  position: absolute;
  bottom: -20px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.error};
`;

const SearchBar = ({
  paramQuery,
  shiftTo,
}: {
  paramQuery: string | null;
  shiftTo: (query: string) => void;
}) => {
  const [query, setQuery] = useState(paramQuery ? paramQuery : "");
  const [message, setMessage] = useState("");

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (0 < query.length && query.length < 2) {
        setMessage("검색어는 2글자 이상 입력하셔야 합니다.");
        return;
      }
      shiftTo(query);
    }
  };

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (0 < query.length && query.length < 2) {
      setMessage("검색어는 2글자 이상 입력하셔야 합니다.");
      return;
    }
    shiftTo(query);
  };

  return (
    <Container>
      <Wrapper>
        <Input
          type="text"
          name="search-bar"
          onChange={(e) => {
            const query = e.target.value;
            if (query.length === 0 || query.length > 2) {
              setMessage("");
            }
            setQuery(query);
          }}
          onKeyDown={handleEnter}
          value={query}
          placeholder="검색어를 입력하세요."
        />
      </Wrapper>
      <Wrapper>
        <Button onClick={handleButton}>
          <FaSearch size={32} />
        </Button>
      </Wrapper>
      {message.length > 0 && <ErrorMsg>{message}</ErrorMsg>}
    </Container>
  );
};

export default SearchBar;
