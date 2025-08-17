import {
  CompanyProps,
  CountryProps,
  GenreProps,
  LanguageProps,
  NetworkProps,
  PersonProps,
} from "./tmdb";

interface SeasonSimpleProps {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface CastProps {
  adult: boolean;
  character: string;
  credit_id: string;
  gender: number;
  id: string;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface CrewProps {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

interface EpisodeProps {
  air_date: string;
  crew: CrewProps[];
  episode_number: number;
  episode_type: string;
  guest_stars: CastProps[];
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

export interface SeasonDetailProps {
  air_date: string;
  episodes: EpisodeProps[];
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
  _id: string;
}

export interface TvSimpleProps {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TvDetailProps {
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
  last_episode_to_air: {
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
  };
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
  seasons: SeasonSimpleProps[];
  spoken_languages: LanguageProps[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}
