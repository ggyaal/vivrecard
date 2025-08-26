import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Stars from "../../../components/Stars";
import IconImage from "../../../components/IconImage";
import { ImTv } from "react-icons/im";
import { Link } from "react-router-dom";
import FadeInImageCard from "../../../components/FadeInImageCard";
import { SeasonDetailProps } from "../../../types/tv";
import ReviewSection from "../../../components/ReviewSection";
import { ContentType } from "../../../types/contentType";
import RecommendModal from "../../../components/RecommendModal";

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

const Overview = styled.p`
  margin: 16px 0;
`;

const Contents = styled.div`
  overflow-x: auto;
  padding: 20px 10px;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    height: 15px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.shadow};
  }
`;

const Episodes = styled.div`
  display: flex;
  gap: 20px;
`;

const Episode = styled(Link)`
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  transition: box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px -5px ${({ theme }) => theme.colors.shadow};
  }
`;

const EpisodeNumber = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.content.tag.blue.text};
  margin: 5px 0;
`;

const EpisodeTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 8px 0;
`;

const EpisodeRuntime = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.shadow};
`;

const EpisodeImgWrapper = styled.div`
  width: 250px;
  aspect-ratio: 250 / 141;
`;

const EpisodeImg = styled.img`
  width: 100%;
`;

const TvSeason = () => {
  const { season, seasonId, saveSeason } = useOutletContext<{
    season: SeasonDetailProps;
    seasonId: string | null;
    saveSeason: (() => Promise<string>) | undefined;
  }>();

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  return (
    <>
      <Container>
        <PosterWrapper>
          {season.poster_path ? (
            <Poster
              src={`${IMAGE_BASE}/${season.poster_path}`}
              alt={`${season.name}`}
            />
          ) : (
            <IconImage Icon={ImTv} size={55} />
          )}
        </PosterWrapper>
        <InfoSection>
          <TitleWrapper>
            <Title>{season.name}</Title>
            <RecommendArea>
              <RecommendModal contentId={seasonId} saveContent={saveSeason} />
            </RecommendArea>
          </TitleWrapper>
          <SubTitle>{`시즌 ${season.season_number}`}</SubTitle>

          <Stars score={season.vote_average} showScore={true} />

          <Overview>{season.overview}</Overview>

          <Contents>
            {season.episodes.length === 0 && <div>에피소드가 없습니다.</div>}
            <Episodes>
              {season.episodes.map((episode) => (
                <FadeInImageCard key={episode.id}>
                  <Episode to={`episodes/${episode.episode_number}`}>
                    <EpisodeImgWrapper>
                      {episode.still_path ? (
                        <EpisodeImg
                          src={`${IMAGE_BASE}/${episode.still_path}`}
                          alt={episode.name}
                        />
                      ) : (
                        <IconImage Icon={ImTv} size={55} />
                      )}
                    </EpisodeImgWrapper>
                    <EpisodeNumber>{episode.episode_number}화</EpisodeNumber>
                    <EpisodeTitle>{episode.name}</EpisodeTitle>
                    {episode.runtime && (
                      <EpisodeRuntime>{episode.runtime} 분</EpisodeRuntime>
                    )}
                  </Episode>
                </FadeInImageCard>
              ))}
            </Episodes>
          </Contents>
        </InfoSection>
      </Container>
      {saveSeason && (
        <ReviewSection
          id={seasonId}
          contentType={ContentType.SEASON}
          maxAmount={season.episodes.length}
          saveContent={saveSeason}
        />
      )}
    </>
  );
};

export default TvSeason;
