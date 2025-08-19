import { PageResponse } from "../../types/api";
import { ContentMemberStarResponse } from "../../types/contentMember";
import { ReviewDetailResponse } from "../../types/review";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getReviews = async ({
  contentId,
  memberId,
  page,
  size = 5,
}: {
  contentId?: string;
  memberId?: string;
  page?: number;
  size?: number;
}): Promise<PageResponse<ReviewDetailResponse>> => {
  const res = await requestAutoRefresh<PageResponse<ReviewDetailResponse>>({
    path: `/api/v1/reviews?sort=createdAt,desc&${
      contentId ? `contentId=${contentId}&` : ""
    }${memberId ? `memberId=${memberId}&` : ""}${page ? `page=${page}&` : ""}${
      size ? `size=${size}` : ""
    }`,
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
  });

  if (!res.isSuccess) {
    return { star: 0, count: 0 } as ContentMemberStarResponse;
  }

  return res.data;
};
