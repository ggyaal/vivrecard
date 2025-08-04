import styled from "styled-components";
import { usePopupLogin } from "../hooks/usePopupLogin";

const Container = styled.button`
  background-color: ${({ theme }) => theme.discord.background};
  color: ${({ theme }) => theme.discord.text};
  width: 300px;
  height: 50px;
  padding: 10px 60px;
  border-radius: 30px;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(90%);
  }
`;

const ButtonText = styled.div`
  background-image: url("/discordButton.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 27px;
  cursor: pointer;
`;

const DiscordLoginButton = () => {
  const { openPopupLogin } = usePopupLogin({
    popupUrl: `${process.env.REACT_APP_BASE_URL}/popup/login/discord`,
    onSuccess: (data) => {
      console.log("Login successful:", data);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    },
  });

  return (
    <Container onClick={openPopupLogin}>
      <ButtonText></ButtonText>
    </Container>
  );
};

export default DiscordLoginButton;
