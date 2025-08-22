import { PageResponse } from "../../types/api";
import { BadgeDetailResponse, BadgeSimpleResponse } from "../../types/badge";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getPublicBadges = async ({
  level,
}: {
  level?: number;
}): Promise<PageResponse<BadgeSimpleResponse> | null> => {
  const res = await requestAutoRefresh<PageResponse<BadgeSimpleResponse>>({
    path: `/api/v1/badges${level ? `?level=${level}` : ""}`,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data;
};

export const getBadge = async ({
  id,
}: {
  id: string;
}): Promise<BadgeDetailResponse | null> => {
  const res = await requestAutoRefresh<BadgeDetailResponse>({
    path: `/api/v1/badges/${id}`,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data;
};

export const getBadgeByMember = async ({
  memberId,
}: {
  memberId: string;
}): Promise<PageResponse<BadgeSimpleResponse> | null> => {
  const res = await requestAutoRefresh<PageResponse<BadgeSimpleResponse>>({
    path: `/api/v1/members/${memberId}/badges`,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data;
};
