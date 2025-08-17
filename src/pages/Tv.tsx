import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { tvDetail } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TvDetailProps } from "../types/tv";

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
  transform: translateY(-50%);
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
  const { data: tv, isLoading } = useQuery<TvDetailProps>({
    queryKey: ["tv", id],
    queryFn: () => {
      const idNumber = Number(id);
      if (isNaN(idNumber)) throw new Error("잘못된 인자입니다.");
      return tvDetail(idNumber);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (!tv) {
    return (
      <>
        <Helmet>
          <title>TV</title>
          <meta name="description" content="TV page of Vivre Card" />
        </Helmet>
        <Container>
          <div>서버 연결에 문제가 발생하였습니다.</div>
        </Container>
      </>
    );
  }

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

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
