import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { tvDetail } from "../api/tmdb/tmdb";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TvDetailProps } from "../types/tv";
import { useEffect } from "react";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Backdrop = styled.div<{ $url: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  aspect-ratio: ${({ $url }) => ($url ? "16 / 8" : "auto")};
  background-image: ${({ $url }) => $url && `url(${$url})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  transform: translateY(-300px);
  max-width: 1200px;
  padding: 30px;
  transition: transform 0.3s ease;
  background-color: ${({ theme }) => theme.content.background};
  color: ${({ theme }) => theme.content.text};
  overflow-x: auto;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ToolButton = styled(IoMdArrowRoundBack)`
  transition: all 0.1s ease;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

const Tv = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";
  const {
    data: tv,
    isLoading,
    isError,
  } = useQuery<TvDetailProps>({
    queryKey: ["tv", id],
    queryFn: () => {
      const idNumber = Number(id);
      if (isNaN(idNumber)) throw new Error("Invalid TV ID");
      return tvDetail(idNumber);
    },
    retry: false,
    enabled: !!id,
  });

  useEffect(() => {
    if (isError) navigate("/404");
  }, [isError, navigate]);

  if (isLoading) return <LoadingSpinner />;

  if (!tv)
    return (
      <>
        <Helmet>
          <title>TV</title>
          <meta name="description" content="TV page of Vivre Card" />
        </Helmet>
        <Container>
          <div>존재하지 않는 시리즈입니다.</div>
        </Container>
      </>
    );

  return (
    <>
      <Helmet>
        <title>{tv.name}</title>
        <meta name="description" content="Tv page of Vivre Card" />
      </Helmet>
      <Container>
        <Backdrop $url={`${IMAGE_BASE}/${tv.backdrop_path}`}>
          <Wrapper>
            <Toolbar>
              <ToolButton size={32} onClick={() => navigate(-1)} />
            </Toolbar>
            <Outlet context={{ tv }} />
          </Wrapper>
        </Backdrop>
      </Container>
    </>
  );
};

export default Tv;
