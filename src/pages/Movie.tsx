import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { movieDetail } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import Stars from "../components/Stars";
import CountryLabel from "../components/CountryLabel";
import LanguageLabel from "../components/LanguageLabel";
import { formatHourMinutes } from "../utils/timeUtils";
import IconImage from "../components/IconImage";
import { LuPopcorn } from "react-icons/lu";

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

interface MovieProps {
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

const Backdrop = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "url",
})<{ url?: string }>`
  width: 100%;
  aspect-ratio: 16 / 8;
  padding-top: ${({ url }) => (url ? "500px" : "10px")};
  background-image: ${({ url }) => url && `url(${url})`};
  background-size: contain;
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  gap: 2rem;
  color: #fff;
  background-color: #1c1c1c;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Poster = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 8px;
  object-fit: cover;
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
  color: #ccc;
  margin: 16px 0;
`;

const Genres = styled.div`
  margin: 16px 0;

  span {
    background-color: #333;
    border-radius: 4px;
    padding: 5px 10px;
    margin-right: 8px;
    font-size: 14px;
  }
`;

const Overview = styled.p`
  margin-bottom: 24px;
  line-height: 1.6;
`;

const Meta = styled.div``;

const MetaWrapper = styled.div`
  display: flex;
  align-items: center;
  & > div:not(:last-child) {
    margin-right: 10px;
  }
`;

const MetaItem = styled.div`
  background-color: #2b2b2b;
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

const Movie = () => {
  const { id } = useParams();
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
          <div>서버 연결에 문제가 발생하였습니다.</div>
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
          url={movie.backdrop_path && `${IMAGE_BASE}/${movie.backdrop_path}`}
        >
          <Wrapper>
            {movie.poster_path ? (
              <Poster
                src={`${IMAGE_BASE}${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <IconImage
                background="#A9A9A9"
                width={300}
                height={450}
                Icon={LuPopcorn}
                size={75}
              />
            )}
            <InfoSection>
              <Title>{movie.title}</Title>
              {movie.original_title && (
                <SubTitle>{movie.original_title}</SubTitle>
              )}
              {movie.tagline && <Tagline>"{movie.tagline}"</Tagline>}

              <Stars score={movie.vote_average} showScore={true} />

              <Genres>
                {movie.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </Genres>

              <Overview>{movie.overview}</Overview>

              <Meta>
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
                      <LanguageLabel code={l.iso_639_1} />
                    ))}
                  </ItemList>
                </MetaItem>
                <MetaItem>
                  <MetaTitle>제작 국가:</MetaTitle>{" "}
                  <ItemList>
                    {movie.production_countries.map((c) => (
                      <CountryLabel isoCode={c.iso_3166_1} showEmoji={true} />
                    ))}
                  </ItemList>
                </MetaItem>
              </Meta>
            </InfoSection>
          </Wrapper>
        </Backdrop>
      </Container>
    </>
  );
};

export default Movie;
