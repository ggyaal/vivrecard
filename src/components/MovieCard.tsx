import { Link } from "react-router-dom";
import styled from "styled-components";
import IconImage from "./IconImage";
import { LuPopcorn } from "react-icons/lu";

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

const Movie = styled.div`
  width: 150px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  filter: brightness(0.5);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(5px);
    filter: none;
  }
`;

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  border-radius: 10px;
`;

const MovieImage = styled.img`
  width: 130px;
  max-height: 200px;
`;

const MovieTitle = styled.div`
  width: 120px;
  font-size: 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MovieYear = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.shadow};
`;

const MovieCard = ({ movie }: { movie: MovieProps }) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <Movie>
        <MovieWrapper>
          <ImageWrapper>
            {movie.poster_path ? (
              <MovieImage
                src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
              />
            ) : (
              <IconImage background="#A9A9A9" Icon={LuPopcorn} size={55} />
            )}
          </ImageWrapper>
        </MovieWrapper>
        <MovieWrapper>
          <MovieTitle>{movie.title}</MovieTitle>
          <MovieYear>{movie.release_date}</MovieYear>
        </MovieWrapper>
      </Movie>
    </Link>
  );
};

export default MovieCard;
