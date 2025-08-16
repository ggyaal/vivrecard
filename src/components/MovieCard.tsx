import { Link } from "react-router-dom";
import styled from "styled-components";
import IconImage from "./IconImage";
import { LuPopcorn } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import FadeInImageCard from "./FadeInImageCard";

export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Container = styled(Link)`
  min-width: 150px;
`;

const Card = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: #fff;
  transition: all 0.2s ease;
  filter: brightness(0.8);
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    filter: none;
  }
`;

const PosterWrapper = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
`;

const Poster = styled.img`
  width: 100%;
`;

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 14px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubInfo = styled.div`
  font-size: 10px;
  color: #666;
  margin-bottom: 4px;
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  color: #f39c12;

  & > svg:not(:last-child) {
    margin-right: 5px;
  }
`;

const MovieCard = ({ movie }: { movie: MovieProps }) => {
  return (
    <Container to={`/movies/${movie.id}`}>
      <FadeInImageCard>
        <Card>
          <PosterWrapper>
            {movie.poster_path ? (
              <Poster
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <IconImage Icon={LuPopcorn} size={55} />
            )}
          </PosterWrapper>
          <Info>
            <Title>{movie.title}</Title>
            <SubInfo>{movie.release_date}</SubInfo>
            <Rating>
              <FaStar size={12} />
              <span>{movie.vote_average.toFixed(1)}</span>
            </Rating>
          </Info>
        </Card>
      </FadeInImageCard>
    </Container>
  );
};

export default MovieCard;
