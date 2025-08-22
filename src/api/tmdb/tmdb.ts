import {
  CollectionProps,
  MovieDetailProps,
  MovieSimpleProps,
} from "../../types/movie";
import { GenreListProps, PageProps, TMDBErrorProps } from "../../types/tmdb";
import {
  SeasonDetailProps,
  TvDetailProps,
  TvSimpleProps,
} from "../../types/tv";

export const discoverMovies = async (
  page: number,
  sort: string,
  genres: string
) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/discover/movie?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&sort_by=${sort}.desc&with_genres=${genres}&vote_count.gte=300`;

  return fetchTMDB<PageProps<MovieSimpleProps>>(url);
};

export const movieGenres = async () => {
  const url = `${process.env.REACT_APP_TMDB_URL}/genre/movie/list?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetchTMDB<GenreListProps>(url);
};

export const movieDetail = async (id: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/movie/${id}?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetchTMDB<MovieDetailProps>(url);
};

export const movieSearch = async (query: string, page: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/search/movie?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`;

  return fetchTMDB<PageProps<MovieSimpleProps>>(url);
};

export const movieCollection = async (id: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/collection/${id}?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetchTMDB<CollectionProps>(url);
};

export const discoverTvs = async (
  page: number,
  sort: string,
  genres: string
) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/discover/tv?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&sort_by=${sort}.desc&with_genres=${genres}&vote_count.gte=300`;

  return fetchTMDB<PageProps<TvSimpleProps>>(url);
};

export const tvGenres = async () => {
  const url = `${process.env.REACT_APP_TMDB_URL}/genre/tv/list?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetchTMDB<GenreListProps>(url);
};

export const tvDetail = async (id: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/tv/${id}?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetchTMDB<TvDetailProps>(url);
};

export const tvSearch = async (query: string, page: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/search/tv?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`;

  return fetchTMDB<PageProps<TvSimpleProps>>(url);
};

export const seasonDetail = async (id: number, number: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/tv/${id}/season/${number}?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetchTMDB<SeasonDetailProps>(url);
};

const fetchTMDB = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.status_message);
  }

  const res = await response.json();

  if (isTMDBErrorResponse(res)) {
    throw new Error(res.status_message);
  }

  return res as T;
};

export function isTMDBErrorResponse(
  response: unknown
): response is TMDBErrorProps {
  return (
    typeof response === "object" &&
    response !== null &&
    typeof (response as TMDBErrorProps).status_message === "string" &&
    typeof (response as TMDBErrorProps).status_code === "number" &&
    typeof (response as TMDBErrorProps).success === "boolean"
  );
}
