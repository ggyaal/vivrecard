import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Status = styled.h1`
  font-size: 48px;
  font-weight: 600;
`;

const NotFound = () => {
  return (
    <Container>
      <Status>404</Status>
      <p>Page Not Found</p>
    </Container>
  );
};

export default NotFound;
