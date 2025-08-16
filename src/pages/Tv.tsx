import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { tvDetail } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { IoMdArrowRoundBack } from "react-icons/io";

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

export interface TvProps {
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
