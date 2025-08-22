export interface GenreProps {
  id: number;
  name: string;
}

export interface CompanyProps {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface CountryProps {
  iso_3166_1: string;
  name: string;
}

export interface LanguageProps {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface NetworkProps {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface PersonProps {
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  original_name: string;
  profile_path: string;
}

export interface GenreListProps {
  genres: GenreProps[];
}

export interface PageProps<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBErrorProps {
  status_code: number;
  status_message: string;
  success: boolean;
}
