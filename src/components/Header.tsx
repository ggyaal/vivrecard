import styled from "styled-components";
import Alert from "./Alert";
import HeaderProfile from "./HeaderProfile";

const Container = styled.header`
  position: absolute;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
  z-index: 1000;
  transition: 0.3s ease;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const Logo = styled.img`
  width: 70px;
`;

const TitleWrapper = styled.div``;

const Title = styled.h1`
  font-size: 50px;
  font-family: "Bonheur Royale", cursive;
  font-weight: 400;
`;

const Discription = styled.p`
  font-size: 16px;
`;

const Header = () => {
  return (
    <Container>
      <Wrapper></Wrapper>
      <Wrapper>
        <Logo src="/logo192.png" alt="Logo" />
        <TitleWrapper>
          <Title>Vivre Card</Title>
          <Discription>Your personal card for life</Discription>
        </TitleWrapper>
      </Wrapper>
      <Wrapper>
        <Alert />
        <HeaderProfile />
      </Wrapper>
    </Container>
  );
};

export default Header;
