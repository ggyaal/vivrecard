import styled from "styled-components";
import DiscordLoginButton from "../components/buttons/DiscordLoginButton";
import { Helmet } from "react-helmet-async";
import GoogleLoginButton from "../components/buttons/GoogleLoginButton";
import { useNavigate } from "react-router-dom";
import useMember from "../hooks/useMember";
import { useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  padding: 20px 50px;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 20px 0;
`;

const Login = () => {
  const navigate = useNavigate();
  const { data: member, isLoading } = useMember();

  useEffect(() => {
    if (!isLoading && member) {
      navigate(-1);
    }
  }, [isLoading, member, navigate]);

  if (isLoading || member) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login page of Vivre Card" />
      </Helmet>
      <Container>
        <Title>로그인</Title>
        <Description>
          로그인하여 Vivre Card의 모든 기능을 이용하세요!
        </Description>
        <Wrapper>
          <Description>Login with Discord:</Description>
          <DiscordLoginButton />
          <Description>Login with Google:</Description>
          <GoogleLoginButton />
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
