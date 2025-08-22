import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  padding: 10px;
  margin: 0 80px;
`;

const MainLoadingSpinner = () => {
  return (
    <Container>
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    </Container>
  );
};

export default MainLoadingSpinner;
