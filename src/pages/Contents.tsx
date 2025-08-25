import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import MainLoadingSpinner from "../components/MainLoadingSpinner";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageResponse } from "../types/api";
import { HttpError } from "../types/HttpError";
import { ContentSimpleResponse } from "../types/content";
import { getContents } from "../api/backend/getContent";
import { ContentType } from "../types/contentType";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 160px;
`;

const Title = styled.h1`
  margin: 30px 0;
  font-size: 24px;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.card.basic.background};
  border: 1px solid ${({ theme }) => theme.card.basic.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.card.basic.text};
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const Contents = () => {
  const navigate = useNavigate();
  const {
    data: contents,
    isLoading,
    isError,
    error,
  } = useQuery<PageResponse<ContentSimpleResponse> | null, HttpError>({
    queryKey: ["contents"],
    queryFn: () =>
      getContents({
        contentTypes: [
          ContentType.BOOK,
          ContentType.MOVIE,
          ContentType.SERIES,
          ContentType.GAME,
          ContentType.MUSIC,
        ],
      }),
    retry: false,
  });

  useEffect(() => {
    if (isError && error.status === 401) {
      navigate("/login");
    }
  }, [isError, error, navigate]);

  if (isLoading) return <MainLoadingSpinner />;

  if (!contents)
    return (
      <>
        <Helmet>
          <title>컨텐츠</title>
          <meta name="description" content="Contents page of Vivre Card" />
        </Helmet>
        <Container>
          <Wrapper>
            <div>서버에 문제가 발생하였습니다.</div>
          </Wrapper>
        </Container>
      </>
    );

  return (
    <>
      <Helmet>
        <title>컨텐츠</title>
        <meta name="description" content="Contents page of Vivre Card" />
      </Helmet>
      <Container>
        <Wrapper>
          <Title>컨텐츠</Title>
        </Wrapper>
        <Wrapper>
          <Grid>
            {contents.content.map((content) => (
              <Card key={content.id}>
                <CardTitle>{content.title}</CardTitle>
                <CardMeta></CardMeta>
              </Card>
            ))}
          </Grid>
        </Wrapper>
      </Container>
    </>
  );
};

export default Contents;
