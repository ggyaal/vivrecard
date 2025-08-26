import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import Stars from "../../../components/Stars";
import { SeasonDetailProps } from "../../../types/tv";
import IconImage from "../../../components/IconImage";
import { ImTv } from "react-icons/im";
import ReviewSection from "../../../components/ReviewSection";
import { getContentId } from "../../../api/backend/getContent";
import { useQuery } from "@tanstack/react-query";
import { createContentEpisode } from "../../../api/backend/createContent";
import { GenreProps } from "../../../types/tmdb";
import { ContentType } from "../../../types/contentType";
import RecommendModal from "../../../components/RecommendModal";

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const ThumbnailWrapper = styled.div`
  min-width: 250px;
  width: 250px;
  height: fit-content;
  border-radius: 8px;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
`;

const HeaderInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const RecommendArea = styled.div`
  margin-left: auto;
`;

const Subtitle = styled.h3`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.shadow};
`;

const Meta = styled.span`
  font-size: 14px;
  margin-bottom: 5px;
`;

const Overview = styled.p`
  margin: 20px 0;
  line-height: 1.5;
`;

const TvEpisode = () => {
  const { episodeNumber } = useParams();
  const { season, seasonId, platformId, genres, saveSeason } =
    useOutletContext<{
      season: SeasonDetailProps;
      seasonId: string | null;
      platformId: string | null;
      genres: GenreProps[];
      saveSeason: (() => Promise<string>) | undefined;
    }>();
  const episode = season.episodes.find(
    (ep) => ep.episode_number === Number(episodeNumber)
  );

  const { data: episodeId, refetch } = useQuery<string | null>({
    queryKey: ["contentId", "TMDB", season.id, episodeNumber],
    queryFn: () =>
      platformId ? getContentId(platformId, `episode_${episode!.id}`) : null,
    enabled: !!platformId,
    retry: false,
  });

  if (!episode)
    return <Container>선택된 에피소드가 존재하지 않습니다.</Container>;

  const saveContent = async () => {
    const parentId = seasonId ? seasonId : await saveSeason!();

    const content = await createContentEpisode(
      parentId,
      platformId!,
      episode,
      genres
    );

    if (parentId) refetch();

    return content.id;
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderInfo>
            <TitleWrapper>
              <Title>{episode.name}</Title>
              <RecommendArea>
                <RecommendModal
                  contentId={episodeId}
                  saveContent={saveSeason ? saveContent : undefined}
                />
              </RecommendArea>
            </TitleWrapper>
            <Subtitle>
              시즌 {episode.season_number} · {episode.episode_number}화
            </Subtitle>
            <Stars score={episode.vote_average} showScore={true} />

            <Meta>방영일: {episode.air_date}</Meta>
            <Meta>런타임: {episode.runtime}분</Meta>
          </HeaderInfo>
          <ThumbnailWrapper>
            {episode.still_path ? (
              <Thumbnail
                src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
              />
            ) : (
              <IconImage Icon={ImTv} size={55} />
            )}
          </ThumbnailWrapper>
        </Header>

        <Overview>{episode.overview}</Overview>
      </Container>
      {saveSeason && (
        <ReviewSection
          id={episodeId}
          contentType={ContentType.EPISODE}
          maxAmount={episode.runtime}
          saveContent={saveContent}
        />
      )}
    </>
  );
};

export default TvEpisode;
