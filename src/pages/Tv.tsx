import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { tvDetail } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import Stars from "../components/Stars";

interface LanguageProps {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface PersonProps {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
}

interface GenreProps {
  id: number;
  name: string;
}

interface EpisodeProps {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface NetworkProps {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface CompanyProps {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface CountryProps {
  iso_3166_1: string;
  name: string;
}

interface SeasonProps {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface TvProps {
  adult: boolean;
  backdrop_path: string;
  created_by: PersonProps[];
  episode_run_time: number[];
  first_air_date: string;
  genres: GenreProps[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeProps;
  name: string;
  networks: NetworkProps[];
  next_episode_to_air: object;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: CompanyProps[];
  production_countries: CountryProps[];
  seasons: SeasonProps[];
  spoken_languages: LanguageProps[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Backdrop = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  min-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 24px;
  padding: 30px;
  background-color: ${({ theme }) => theme.content.background};
  color: ${({ theme }) => theme.content.text};
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 10px;
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

const Overview = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const Meta = styled.div``;

const Rating = styled.span`
  font-weight: bold;
  color: #f39c12;
`;

const Tv = () => {
  const { id } = useParams();
  const { data: tv, isLoading } = useQuery<TvProps>({
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

  return (
    <Container>
      <Backdrop>
        <Wrapper>
          <Poster
            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
            alt={tv.name}
          />
          <InfoSection>
            <Title>{tv.name}</Title>
            <SubTitle>{tv.original_name}</SubTitle>
            {tv.tagline && <Tagline>"{tv.tagline}"</Tagline>}

            <Stars score={tv.vote_average} showScore={true} />

            <Genres>
              {tv.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </Genres>

            <Overview>{tv.overview}</Overview>

            <Meta>
              <p>첫 방영일: {tv.first_air_date}</p>
              <p>마지막 방영일: {tv.last_air_date}</p>
              <p>시즌 수: {tv.number_of_seasons}</p>
              <p>총 에피소드 수: {tv.number_of_episodes}</p>
              <p>
                평점: <Rating>⭐ {tv.vote_average.toFixed(1)}</Rating> (
                {tv.vote_count}명)
              </p>
              <p>원어: {tv.original_language.toUpperCase()}</p>
            </Meta>
          </InfoSection>
        </Wrapper>
      </Backdrop>
    </Container>
  );
};

export default Tv;
