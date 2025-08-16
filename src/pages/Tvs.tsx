import { keepPreviousData, useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { discoverTvs, tvGenres, tvSearch } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import TvCard, { TvProps } from "../components/TvCard";
import { Helmet } from "react-helmet-async";
import PageNav from "../components/PageNav";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { parseSort } from "../utils/parseUtils";
import SelectTag from "../components/SelectTag";
import Dropdown from "../components/Dropdown";

export interface GenreProps {
  genres: {
    id: number;
    name: string;
  }[];
}

interface TvPageProps {
  page: number;
  results: TvProps[];
  total_pages: number;
  total_results: number;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  padding: 10px;
  margin: 0 80px;
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  flex-wrap: wrap;
  gap: 5px 10px;
`;

const TvList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

const EmptyList = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const Tvs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = searchParams.get("page");
  const pageNumber = paramPage && Number(paramPage) > 0 ? Number(paramPage) : 1;
  const paramQuery = searchParams.get("query");
  const paramSort = parseSort(searchParams.get("sort"));
  const paramGenres = searchParams.get("genres");
  const selectGenres = paramGenres ? paramGenres.split(",") : [];

  const { data: genres, isLoading: genresLoading } = useQuery<GenreProps>({
    queryKey: ["tv", "genres"],
    queryFn: () => tvGenres(),
  });

  const queryKey =
    paramQuery && paramQuery.length > 0
      ? ["tv", paramQuery, pageNumber]
      : ["tv", pageNumber, paramSort, selectGenres.join(",")];

  const { data: tvs, isLoading } = useQuery<TvPageProps>({
    queryKey: queryKey,
    queryFn: () =>
      paramQuery && paramQuery.length > 0
        ? tvSearch(paramQuery, pageNumber)
        : discoverTvs(pageNumber, paramSort, selectGenres.join(",")),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!tvs) {
    return (
      <>
        <Helmet>
          <title>TV</title>
          <meta name="description" content="TV page of Vivre Card" />
        </Helmet>
        <Container>
          <Wrapper>
            <div>서버 연결에 문제가 발생하였습니다.</div>
          </Wrapper>
        </Container>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>TV</title>
        <meta name="description" content="TV page of Vivre Card" />
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
                    searchParams.set("page", "1");
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
                searchParams.set("sort", sort);
                searchParams.set("page", "1");
                setSearchParams(searchParams);
              }}
              noSelect={false}
            />
          </Wrapper>
        )}
        <Wrapper>
          <PageNav
            page={pageNumber}
            totalPage={tvs.total_pages < 500 ? tvs.total_pages : 500}
            isFirst={pageNumber <= 1}
            isLast={
              (tvs.total_pages < 500 ? tvs.total_pages : 500) <= pageNumber
            }
            shiftToPage={(page) => {
              searchParams.set("page", String(page));
              setSearchParams(searchParams);
            }}
          />
        </Wrapper>
        <Wrapper>
          {tvs.results.length > 0 ? (
            <TvList>
              {tvs.results.map((tv) => (
                <TvCard key={tv.id} tv={tv} />
              ))}
            </TvList>
          ) : (
            <EmptyList>검색 결과가 없습니다.</EmptyList>
          )}
        </Wrapper>
      </Container>
    </>
  );
};

export default Tvs;
