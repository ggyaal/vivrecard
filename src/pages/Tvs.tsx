import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { discoverTv } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import TvCard, { TvProps } from "../components/TvCard";
import { Helmet } from "react-helmet-async";
import PageNav from "../components/PageNav";
import { useSearchParams } from "react-router-dom";

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

const TvList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`;

const Tvs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramPage = searchParams.get("page");
  const pageNumber = paramPage && Number(paramPage) > 0 ? Number(paramPage) : 1;
  const { data: tvs, isLoading } = useQuery<TvPageProps>({
    queryKey: ["tvs", pageNumber],
    queryFn: () => discoverTv(pageNumber),
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
    <Container>
      <Wrapper>
        <PageNav
          page={pageNumber}
          totalPage={tvs.total_pages < 500 ? tvs.total_pages : 500}
          isFirst={pageNumber <= 1}
          isLast={(tvs.total_pages < 500 ? tvs.total_pages : 500) <= pageNumber}
          shiftToPage={(page) => {
            searchParams.set("page", String(page));
            setSearchParams(searchParams);
          }}
        />
      </Wrapper>
      <Wrapper>
        <TvList>
          {tvs.results.map((tv) => (
            <TvCard key={tv.id} tv={tv} />
          ))}
        </TvList>
      </Wrapper>
    </Container>
  );
};

export default Tvs;
