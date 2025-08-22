import { isRouteErrorResponse, useRouteError } from "react-router-dom";
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

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <Status>{error.status}</Status>
        <p>{error.statusText}</p>
      </Container>
    );
  }

  if (error instanceof Error) {
    return (
      <Container>
        <Status>{error.name}</Status>
        <p>{error.message}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Status>500</Status>
      <p>Something went wrong on our end. Please try again later.</p>
    </Container>
  );
};

export default ErrorPage;
