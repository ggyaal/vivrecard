import { ContentDetailResponse, CreateContentProps } from "../../types/content";
import { ContentType } from "../../types/contentType";
import { MovieDetailProps } from "../../types/movie";
import { GenreProps } from "../../types/tmdb";
import { EpisodeProps, SeasonDetailProps, TvDetailProps } from "../../types/tv";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export const createContentMovie = async ({
  platformId,
  data,
  isProvider = true,
}: {
  platformId: string;
  data: MovieDetailProps;
  isProvider?: boolean;
}) => {
  const req: CreateContentProps = {
    idInPlatform: `movie_${data.id}`,
    content: {
      title: data.title,
      overview: data.overview.length > 0 ? data.overview : "[없음]",
      rating: data.vote_average,
      imageUrl: `${IMAGE_BASE}${data.poster_path}`,
      homepage: data.homepage,
      totalAmount: data.runtime,
      contentType: ContentType.MOVIE,
    },
    genres: data.genres.map((genre) => ({
      platformId: platformId,
      idInPlatform: genre.id.toString(),
      genre: {
        name: genre.name,
      },
    })),
  };

  return await createContent(platformId, req, isProvider);
};

export const createContentSeries = async ({
  platformId,
  data,
  isProvider = true,
}: {
  platformId: string;
  data: TvDetailProps;
  isProvider?: boolean;
}) => {
  const req: CreateContentProps = {
    idInPlatform: `tv_${data.id}`,
    content: {
      title: data.name,
      overview: data.overview.length > 0 ? data.overview : "[없음]",
      rating: data.vote_average,
      imageUrl: `${IMAGE_BASE}${data.poster_path}`,
      homepage: data.homepage,
      totalAmount: data.number_of_seasons,
      contentType: ContentType.SERIES,
    },
    genres: data.genres.map((genre) => ({
      platformId: platformId,
      idInPlatform: genre.id.toString(),
      genre: {
        name: genre.name,
      },
    })),
  };

  return await createContent(platformId, req, isProvider);
};

export const createContentSeason = async ({
  parentId,
  platformId,
  data,
  genres,
  isProvider = true,
}: {
  parentId: string;
  platformId: string;
  data: SeasonDetailProps;
  genres: GenreProps[];
  isProvider?: boolean;
}) => {
  const req: CreateContentProps = {
    idInPlatform: `season_${data.id}`,
    content: {
      title: data.name,
      overview: data.overview.length > 0 ? data.overview : "[없음]",
      rating: data.vote_average,
      imageUrl: `${IMAGE_BASE}${data.poster_path}`,
      totalAmount: data.episodes.length,
      contentType: ContentType.SEASON,
      parentId,
      childrenIdx: data.season_number,
    },
    genres: genres.map((genre) => ({
      platformId,
      idInPlatform: genre.id.toString(),
      genre: {
        name: genre.name,
      },
    })),
  };

  return await createContent(platformId, req, isProvider);
};

export const createContentEpisode = async ({
  parentId,
  platformId,
  data,
  genres,
  isProvider = true,
}: {
  parentId: string;
  platformId: string;
  data: EpisodeProps;
  genres: GenreProps[];
  isProvider?: boolean;
}) => {
  const req: CreateContentProps = {
    idInPlatform: `episode_${data.id}`,
    content: {
      title: data.name,
      overview: data.overview.length > 0 ? data.overview : "[없음]",
      rating: data.vote_average,
      imageUrl: `${IMAGE_BASE}${data.still_path}`,
      totalAmount: data.runtime,
      contentType: ContentType.EPISODE,
      parentId,
      childrenIdx: data.episode_number,
    },
    genres: genres.map((genre) => ({
      platformId,
      idInPlatform: genre.id.toString(),
      genre: {
        name: genre.name,
      },
    })),
  };

  return await createContent(platformId, req, isProvider);
};

const createContent = async (
  platformId: string,
  data: CreateContentProps,
  isProvider: boolean
) => {
  const res = await requestAutoRefresh({
    path: `/api/v1/platforms${
      isProvider ? "/provider" : ""
    }/${platformId}/contents`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
    requiredLogin: true,
  });

  return res.data as ContentDetailResponse;
};
