import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import styled from "styled-components";
import Stars from "../../../components/Stars";
import IconImage from "../../../components/IconImage";
import { LuPopcorn } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import { MovieDetailProps } from "../../../types/movie";
import { useQuery } from "@tanstack/react-query";
import { getPlatformId } from "../../../api/backend/getPlatform";
import { getContentId } from "../../../api/backend/getContent";
import ReviewSection from "../../../components/ReviewSection";
import { createContentMovie } from "../../../api/backend/createContent";

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
  color: ${({ theme }) => theme.content.subtext};
  margin: 16px 0;
`;

const Genres = styled.div`
  margin: 16px 0;

  span {
    background-color: ${({ theme }) => theme.content.block.background};
    color: ${({ theme }) => theme.content.block.text};
    border-radius: 4px;
    padding: 5px 10px;
    margin-right: 8px;
    font-size: 14px;
  }
`;

const Menu = styled.div`
  display: flex;
  padding: 10px 0;
`;

const MenuItem = styled(NavLink)`
  position: relative;
  background-color: ${({ theme }) => theme.content.block.background};
  color: ${({ theme }) => theme.content.block.text};
  padding: 15px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.content.tag.secondary};
  }
`;

const Meta = styled.div``;

const MovieInfo = () => {
  const { search } = useLocation();
  const { movie } = useOutletContext<{ movie: MovieDetailProps }>();
  const { data: platformId } = useQuery<string | null>({
    queryKey: ["platformId", "TMDB"],
    queryFn: () => getPlatformId("TMDB"),
  });
  const { data: contentId, refetch } = useQuery<string | null>({
    queryKey: ["contentId", "TMDB", movie.id],
    queryFn: () =>
      platformId ? getContentId(platformId, `movie_${movie.id}`) : null,
    enabled: !!platformId,
  });

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  if (!movie) return <div>영화 정보가 없습니다.</div>;

  return (
    <>
      <Container>
        <PosterWrapper>
          {movie.poster_path ? (
            <Poster
              src={`${IMAGE_BASE}${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <IconImage background="#A9A9A9" Icon={LuPopcorn} size={75} />
          )}
        </PosterWrapper>
        <InfoSection>
          <Title>{movie.title}</Title>
          {movie.original_title && <SubTitle>{movie.original_title}</SubTitle>}
          {movie.tagline && <Tagline>"{movie.tagline}"</Tagline>}

          <Stars score={movie.vote_average} showScore={true} />

          <Genres>
            {movie.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </Genres>

          <Menu>
            <MenuItem to={{ pathname: ".", search }} end>
              작품 소개
            </MenuItem>
            <MenuItem to={{ pathname: "collection", search }}>시리즈</MenuItem>
          </Menu>

          <Meta>
            <Outlet context={{ movie }} />
          </Meta>
        </InfoSection>
      </Container>
      <ReviewSection
        id={contentId}
        idRefetch={refetch}
        saveContent={async () => {
          const content = await createContentMovie(platformId!, movie);
          return content.id;
        }}
      />
    </>
  );
};

export default MovieInfo;
