import { ContentDetailResponse } from "../../types/content";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getContentId = async (platformId: string, id: string) => {
  const res = await requestAutoRefresh({
    path: `/api/v1/platforms/${platformId}/contents/${id}`,
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
