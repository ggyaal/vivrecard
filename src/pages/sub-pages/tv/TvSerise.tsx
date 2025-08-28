import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Stars from "../../../components/Stars";
import { ImTv } from "react-icons/im";
import IconImage from "../../../components/IconImage";
import { TvDetailProps } from "../../../types/tv";
import ReviewSection from "../../../components/ReviewSection";
import { getContentId } from "../../../api/backend/getContent";
import { createContentSeries } from "../../../api/backend/createContent";
import { useQuery } from "@tanstack/react-query";
import { ContentType } from "../../../types/contentType";
import RecommendModal from "../../../components/RecommendModal";
import { PlatformProvider } from "../../../types/platformType";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const PosterWrapper = styled.div`
  min-width: 300px;
  width: 300px;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  width: 100%;
  max-width: 810px;
  overflow-x: auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 10px;
`;

const RecommendArea = styled.div`
  margin-left: auto;
`;

const SubTitle = styled.h2`
  font-size: 12px;
`;

const Tagline = styled.p`
  font-style: italic;
  margin: 16px 0;
`;

const Genres = styled.div`
  margin: 16px 0;
  span {
    background-color: ${({ theme }) => theme.content.block.background};
    color: ${({ theme }) => theme.content.block.text};
    padding: 4px 8px;
    margin-right: 8px;
    border-radius: 4px;
    font-size: 0.875rem;
  }
`;

const Menu = styled.div`
  display: flex;
  padding: 10px 0;
`;

const MenuItem = styled(NavLink)`
  position: relative;
  background-color: ${({ theme }) => theme.content.block.background};
  color: ${({ theme }) => theme.button.tertiary.text};
  padding: 15px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.button.primary.background};
  }
`;

const Meta = styled.div``;

const TvSerise = () => {
  const { search } = useLocation();
  const { tv } = useOutletContext<{ tv: TvDetailProps }>();
  const { data: contentId, refetch } = useQuery<string | null>({
    queryKey: ["TMDB", tv.id, "contentId"],
    queryFn: () =>
      getContentId({
        platformId: PlatformProvider.TMDB,
        id: `tv_${tv.id}`,
      }),
    enabled: !!tv,
    retry: false,
  });

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  const saveContent = async () => {
    const content = await createContentSeries({
      platformId: PlatformProvider.TMDB,
      data: tv,
    });
    if (content) refetch();
    return content.id;
  };

  return (
    <>
      <Container>
        <PosterWrapper>
          {tv.poster_path ? (
            <Poster src={`${IMAGE_BASE}/${tv.poster_path}`} alt={tv.name} />
          ) : (
            <IconImage Icon={ImTv} size={55} />
          )}
        </PosterWrapper>
        <InfoSection>
          <TitleWrapper>
            <Title>{tv.name}</Title>
            <RecommendArea>
              <RecommendModal contentId={contentId} saveContent={saveContent} />
            </RecommendArea>
          </TitleWrapper>
          <SubTitle>{tv.original_name}</SubTitle>
          {tv.tagline && <Tagline>"{tv.tagline}"</Tagline>}

          <Stars score={tv.vote_average} showScore={true} />

          <Genres>
            {tv.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </Genres>

          <Menu>
            <MenuItem to={{ pathname: ".", search }} end>
              작품 소개
            </MenuItem>
            <MenuItem to={{ pathname: "seasons", search }}>시즌</MenuItem>
            <MenuItem to={{ pathname: "watched", search }}>봤어요</MenuItem>
          </Menu>

          <Meta>
            <Outlet context={{ tv, contentId }} />
          </Meta>
        </InfoSection>
      </Container>
      <ReviewSection
        id={contentId}
        contentType={ContentType.SERIES}
        maxAmount={tv.number_of_seasons}
        saveContent={saveContent}
      />
    </>
  );
};

export default TvSerise;
