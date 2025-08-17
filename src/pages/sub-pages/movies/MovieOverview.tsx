import styled from "styled-components";
import { formatHourMinutes } from "../../../utils/timeUtils";
import CountryLabel from "../../../components/CountryLabel";
import LanguageLabel from "../../../components/LanguageLabel";
import { useOutletContext } from "react-router-dom";
import { MovieDetailProps } from "../../../types/movie";

const Overview = styled.p`
  margin-bottom: 24px;
  line-height: 1.6;
`;

const MetaWrapper = styled.div`
  display: flex;
  align-items: center;
  & > div:not(:last-child) {
    margin-right: 10px;
  }
`;

const MetaItem = styled.div`
  background-color: ${({ theme }) => theme.content.block.background};
  color: ${({ theme }) => theme.content.block.text};
  padding: 10px 20px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const MetaTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const MetaValue = styled.div`
  font-weight: 600;
`;

const ItemList = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;

  & > div:not(:last-child) {
    margin-right: 10px;
  }
`;

const MovieOverview = () => {
  const { movie } = useOutletContext<{ movie: MovieDetailProps }>();

  if (!movie) return <div>영화 정보가 없습니다.</div>;

  return (
    <>
      <Overview>{movie.overview}</Overview>
      <MetaWrapper>
        <MetaItem>
          <MetaTitle>개봉일:</MetaTitle>{" "}
          <MetaValue>{movie.release_date}</MetaValue>
        </MetaItem>
        <MetaItem>
          <MetaTitle>상영시간:</MetaTitle>
          <MetaValue>{formatHourMinutes(movie.runtime)}</MetaValue>
        </MetaItem>
        <MetaItem>
          <MetaTitle>제작비:</MetaTitle>
          <MetaValue>$ {movie.budget.toLocaleString()}</MetaValue>
        </MetaItem>
        <MetaItem>
          <MetaTitle>수익:</MetaTitle>
          <MetaValue>$ {movie.revenue.toLocaleString()}</MetaValue>
        </MetaItem>
        <MetaItem>
          <MetaTitle>별점:</MetaTitle>{" "}
          <MetaValue>
            {movie.vote_average} ({movie.vote_count} votes)
          </MetaValue>
        </MetaItem>
      </MetaWrapper>
      <MetaItem>
        <MetaTitle>언어:</MetaTitle>{" "}
        <ItemList>
          {movie.spoken_languages.map((l) => (
            <LanguageLabel key={`l_${l.iso_639_1}`} code={l.iso_639_1} />
          ))}
        </ItemList>
      </MetaItem>
      <MetaItem>
        <MetaTitle>제작 국가:</MetaTitle>{" "}
        <ItemList>
          {movie.production_countries.map((c) => (
            <CountryLabel
              key={`c_${c.iso_3166_1}`}
              isoCode={c.iso_3166_1}
              showEmoji={true}
            />
          ))}
        </ItemList>
      </MetaItem>
    </>
  );
};

export default MovieOverview;
