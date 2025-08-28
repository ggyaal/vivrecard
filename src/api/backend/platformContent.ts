import { PageResponse } from "../../types/api";
import { PlatformContentResponse } from "../../types/platformContent";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getPlatformsByContentId = async ({
  contentId,
  page,
}: {
  contentId: string;
  page?: number;
}) => {
  const res = await requestAutoRefresh<PageResponse<PlatformContentResponse>>({
    path: `/api/v1/contents/${contentId}/platforms${
      page ? `?page=${page}` : ""
    }`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return {} as PageResponse<PlatformContentResponse>;
  }

  return res.data;
};

export const getPlatformContentById = async ({
  platformId,
  contentId,
  isProvider = true,
}: {
  platformId: string;
  contentId: string;
  isProvider?: boolean;
}) => {
  const res = await requestAutoRefresh<PlatformContentResponse>({
    path: `/api/v1/contents/${contentId}/platforms${
      isProvider ? "/provider" : ""
    }/${platformId}`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data;
};
