import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { movieSearch, discoverMovies, movieGenres } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import MovieCard, { MovieProps } from "../components/MovieCard";
import PageNav from "../components/PageNav";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Dropdown from "../components/Dropdown";
import { parseSort } from "../utils/parseUtils";
import SelectTag from "../components/SelectTag";

interface MoviePageProps {
  page: number;
  total_pages: number;
  total_results: number;
  results: MovieProps[];
}

export interface GenreProps {
  genres: {
    id: number;
    name: string;
  }[];
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  flex-wrap: wrap;
  gap: 5px 10px;
`;

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

const EmptyList = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = searchParams.get("page");
  const pageNumber = paramPage && Number(paramPage) > 0 ? Number(paramPage) : 1;
  const paramQuery = searchParams.get("query");
  const paramSort = parseSort(searchParams.get("sort"));
  const paramGenres = searchParams.get("genres");
  const selectGenres = paramGenres ? paramGenres.split(",") : [];

  const { data: genres, isLoading: genresLoading } = useQuery<GenreProps>({
    queryKey: ["movies", "genres"],
    queryFn: () => movieGenres(),
  });

  const queryKey =
    paramQuery && paramQuery?.length > 0
      ? ["movies", paramQuery, pageNumber]
      : ["movies", pageNumber, paramSort, selectGenres.join(",")];

  const { data: movies, isLoading } = useQuery<MoviePageProps, Error>({
    queryKey,
    queryFn: () =>
      paramQuery && paramQuery.length > 1
        ? movieSearch(paramQuery, pageNumber)
        : discoverMovies(pageNumber, paramSort, selectGenres.join(",")),
    placeholderData: keepPreviousData,
    gcTime: 1000 * 60 * 3,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!movies)
    return (
      <>
        <Helmet>
          <title>영화</title>
          <meta name="description" content="Movie page of Vivre Card" />
        </Helmet>
        <Container>
          <Wrapper>
            <div>서버 연결에 문제가 발생하였습니다.</div>
          </Wrapper>
        </Container>
      </>
    );

  return (
    <>
      <Helmet>
        <title>영화</title>
        <meta name="description" content="Movie page of Vivre Card" />
      </Helmet>
      <Container>
        <Wrapper>
          <SearchBar
            paramQuery={paramQuery}
            shiftTo={(query: string) => {
              if (query.length === 0) {
                setSearchParams({});
                return;
              }
              setSearchParams({ query });
            }}
          />
        </Wrapper>
        {!paramQuery && !genresLoading && genres && (
          <Wrapper>
            <TagWrapper>
              {genres.genres.map((genre) => (
                <SelectTag
                  key={`genre_${genre.id}`}
                  name={genre.name}
                  isSelect={selectGenres.includes(String(genre.id))}
                  onClick={() => {
                    const id = String(genre.id);
                    if (selectGenres.includes(id)) {
                      searchParams.set(
                        "genres",
                        selectGenres.filter((g) => g !== id).join(",")
                      );
                    } else {
                      searchParams.set(
                        "genres",
                        [...selectGenres, id].join(",")
                      );
                    }
                    setSearchParams(searchParams);
                  }}
                />
              ))}
            </TagWrapper>
          </Wrapper>
        )}
        {!paramQuery && (
          <Wrapper>
            <Dropdown
              options={[
                {
                  name: "인기순",
                  value: "popularity",
                  isSelect: paramSort === "popularity",
                },
                {
                  name: "별점순",
                  value: "vote_average",
                  isSelect: paramSort === "vote_average",
                },
                {
                  name: "개봉순",
                  value: "release_date",
                  isSelect: paramSort === "release_date",
                },
              ]}
              shiftTo={(sort) => {
                setSearchParams({ sort });
              }}
              noSelect={false}
            />
          </Wrapper>
        )}
        <Wrapper>
          <PageNav
            page={pageNumber}
            totalPage={movies.total_pages < 500 ? movies.total_pages : 500}
            isFirst={pageNumber <= 1}
            isLast={
              pageNumber >=
              (movies.total_pages < 500 ? movies.total_pages : 500)
            }
            shiftToPage={(page) => {
              searchParams.set("page", String(page));
              setSearchParams(searchParams);
            }}
          />
        </Wrapper>
        <Wrapper>
          {movies.results.length > 0 ? (
            <MovieList>
              {movies.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </MovieList>
          ) : (
            <EmptyList>검색 결과가 없습니다.</EmptyList>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Movies;
