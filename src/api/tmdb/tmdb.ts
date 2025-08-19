export const discoverMovies = async (
  page: number,
  sort: string,
  genres: string
) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/discover/movie?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&sort_by=${sort}.desc&with_genres=${genres}&vote_count.gte=300`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const movieGenres = async () => {
  const url = `${process.env.REACT_APP_TMDB_URL}/genre/movie/list?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const movieDetail = async (id: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/movie/${id}?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const movieSearch = async (query: string, page: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/search/movie?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const movieCollection = async (id: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/collection/${id}?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const discoverTvs = async (
  page: number,
  sort: string,
  genres: string
) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/discover/tv?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${page}&sort_by=${sort}.desc&with_genres=${genres}&vote_count.gte=300`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const tvGenres = async () => {
  const url = `${process.env.REACT_APP_TMDB_URL}/genre/tv/list?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const tvDetail = async (id: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/tv/${id}?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const tvSearch = async (query: string, page: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/search/tv?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};

export const seasonDetail = async (id: number, number: number) => {
  const url = `${process.env.REACT_APP_TMDB_URL}/tv/${id}/season/${number}?language=ko-KR&api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

  return fetch(url, {
    method: "GET",
  }).then((res) => res.json());
};
