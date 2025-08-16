import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { movieDetail } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { IoMdArrowRoundBack } from "react-icons/io";

interface GenreProps {
  id: number;
  name: string;
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

interface LanguageProps {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: GenreProps[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: CompanyProps[];
  production_countries: CountryProps[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: LanguageProps[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Backdrop = styled.div<{ $url?: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  aspect-ratio: ${({ $url }) => ($url ? "16 / 8" : "auto")};
  padding-top: ${({ $url }) => ($url ? "500px" : "10px")};
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
  color: ${({ theme }) => theme.content.text};
  background-color: ${({ theme }) => theme.content.background};
  border-radius: ${({ theme }) => theme.borderRadius};
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

const Movie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: movie, isLoading } = useQuery<MovieProps>({
    queryKey: ["movie", id],
    queryFn: () => {
      const idNumber = Number(id);
      if (isNaN(idNumber)) throw new Error("잘못된 인자입니다.");
      return movieDetail(idNumber);
    },
    placeholderData: keepPreviousData,
    gcTime: 1000 * 60 * 3,
  });

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  if (isLoading) return <LoadingSpinner />;

  if (!movie)
    return (
      <>
        <Helmet>
          <title>영화</title>
          <meta name="description" content="Movie page of Vivre Card" />
        </Helmet>
        <Container>
          <div>존재하지 않는 영화입니다.</div>
        </Container>
      </>
    );

  return (
    <>
      <Helmet>
        <title>{movie.title}</title>
        <meta name="description" content="Movie page of Vivre Card" />
      </Helmet>
      <Container>
        <Backdrop
          $url={movie.backdrop_path && `${IMAGE_BASE}/${movie.backdrop_path}`}
        >
          <Wrapper>
            <Toolbar>
              <ToolButton size={32} onClick={() => navigate(-1)} />
            </Toolbar>
            <Outlet context={{ movie }} />
          </Wrapper>
        </Backdrop>
      </Container>
    </>
  );
};

export default Movie;
