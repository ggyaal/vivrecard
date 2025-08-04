import styled from "styled-components";

const Container = styled.button`
  background-color: ${({ theme }) => theme.google.background};
  color: ${({ theme }) => theme.google.text};
  width: 300px;
  height: 50px;
  padding: 10px 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(90%);
  }
`;

const ButtonText = styled.div`
  background-image: url("/googleLogo.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

const Text = styled.span`
  margin-left: 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.google.text};
  cursor: pointer;
  font-weight: 500;
`;

const GoogleLoginButton = () => {
  return (
    <Container>
      <ButtonText></ButtonText>
      <Text>Login with Google</Text>
    </Container>
  );
};

export default GoogleLoginButton;
