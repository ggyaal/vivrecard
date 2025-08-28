import { PageResponse } from "../../types/api";
import { ContentMemberStarResponse } from "../../types/contentMember";
import { ReviewDetailResponse } from "../../types/review";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getReviews = async ({
  contentId,
  memberId,
  includeChildren = false,
  page,
  size = 5,
  signal,
}: {
  contentId: string;
  memberId: string;
  includeChildren?: boolean;
  page?: number;
  size?: number;
  signal?: AbortSignal;
}): Promise<PageResponse<ReviewDetailResponse>> => {
  const res = await requestAutoRefresh<PageResponse<ReviewDetailResponse>>({
    path: `/api/v1/contents/${contentId}/members/${memberId}/reviews?sort=created_at,desc&includeChildren=${includeChildren}&${
      page ? `page=${page}&` : ""
    }${size ? `size=${size}` : ""}`,
    requiredLogin: true,
    signal,
  });

  if (!res.isSuccess) {
    return {} as PageResponse<ReviewDetailResponse>;
  }

  return res.data;
};

export const getReviewsByContentId = async ({
  contentId,
  page,
  size = 5,
  signal,
}: {
  contentId?: string;
  page?: number;
  size?: number;
  signal?: AbortSignal;
}) => {
  const res = await requestAutoRefresh<PageResponse<ReviewDetailResponse>>({
    path: `/api/v1/contents/${contentId}/reviews?sort=createdAt,desc&${
      page ? `page=${page}` : ""
    }${size ? `size=${size}&` : ""}`,
    requiredLogin: true,
    signal,
  });

  if (!res.isSuccess) {
    return {} as PageResponse<ReviewDetailResponse>;
  }

  return res.data;
};

export const getReviewsByMemberId = async ({
  memberId,
  page,
  size = 5,
  signal,
}: {
  memberId?: string;
  page?: number;
  size?: number;
  signal?: AbortSignal;
}) => {
  const res = await requestAutoRefresh<PageResponse<ReviewDetailResponse>>({
    path: `/api/v1/members/${memberId}/reviews?sort=createdAt,desc&${
      page ? `page=${page}` : ""
    }${size ? `size=${size}&` : ""}`,
    requiredLogin: true,
    signal,
  });

  if (!res.isSuccess) {
    return {} as PageResponse<ReviewDetailResponse>;
  }

  return res.data;
};

export const getReviewStars = async (
  contentId: string
): Promise<ContentMemberStarResponse> => {
  const res = await requestAutoRefresh<ContentMemberStarResponse>({
    path: `/api/v1/contents/${contentId}/stars`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return { star: 0, count: 0 } as ContentMemberStarResponse;
  }

  return res.data;
};
