import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const Container = styled.main`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: 150px;

  @media (max-width: 600px) {
    font-size: 1.2rem;
    padding: 15px;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
    padding: 10px;
  }
  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page of Vivre Card" />
      </Helmet>
      <Container>
        <h1>Welcome to Vivre Card</h1>
        <p>Your personal card for life.</p>
        <p>Explore our features and enjoy the experience!</p>
      </Container>
    </>
  );
};

export default Home;
