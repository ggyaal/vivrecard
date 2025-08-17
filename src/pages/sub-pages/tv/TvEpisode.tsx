import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import Stars from "../../../components/Stars";
import { SeasonDetailProps } from "../../../types/tv";
import IconImage from "../../../components/IconImage";
import { ImTv } from "react-icons/im";

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ThumbnailWrapper = styled.div`
  min-width: 250px;
  width: 250px;
  border-radius: 8px;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 10px;
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
  const { season } = useOutletContext<{ season: SeasonDetailProps }>();
  const episode = season.episodes.find(
    (ep) => ep.episode_number === Number(episodeNumber)
  );

  if (!episode)
    return <Container>선택된 에피소드가 존재하지 않습니다.</Container>;

  return (
    <Container>
      <Header>
        <HeaderInfo>
          <Title>{episode.name}</Title>
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
  );
};

export default TvEpisode;
