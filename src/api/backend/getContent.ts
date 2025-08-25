import { PageResponse } from "../../types/api";
import {
  ContentDetailResponse,
  ContentSimpleResponse,
} from "../../types/content";
import { ContentType } from "../../types/contentType";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getContents = async ({
  page,
  contentTypes,
  genreIds,
}: {
  page?: number;
  contentTypes?: ContentType[];
  genreIds?: number[];
} = {}) => {
  const res = await requestAutoRefresh<PageResponse<ContentSimpleResponse>>({
    path: `/api/v1/contents?sort=updatedAt,desc&${
      contentTypes
        ? contentTypes.map((type) => `contentType=${type}&`).join("")
        : ""
    }${
      genreIds
        ? genreIds.map((genreId) => `contentType=${genreId}&`).join("")
        : ""
    }${page ? `page=${page}` : ""}`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data;
};

export const getContentId = async (
  platformId: string,
  id: string,
  throwable: boolean = true
) => {
  const res = await requestAutoRefresh({
    path: `/api/v1/platforms/${platformId}/contents/${id}`,
    requiredLogin: true,
    throwable,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data.id as string;
};

export const getContent = async (id: string) => {
  const res = await requestAutoRefresh({
    path: `/api/v1/contents/${id}`,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data as ContentDetailResponse;
};
