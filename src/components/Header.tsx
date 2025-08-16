import styled from "styled-components";
import Alert from "./Alert";
import HeaderProfile from "./profiles/HeaderProfile";

const Container = styled.header`
  position: absolute;
  width: 100%;
  height: 120px;
  min-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
  transition: all 0.3s ease;
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

  &:nth-child(2) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
  }

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
