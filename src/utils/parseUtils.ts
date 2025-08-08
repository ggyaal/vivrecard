export const parseSort = (sort: string | null) => {
  return sort && ["popularity", "vote_average", "release_date"].includes(sort)
    ? sort
    : "popularity";
};
