import requestAutoRefresh from "../../utils/requestAutoRefresh";

interface CreateReviewRequest {
  message: string;
  star: number;
  consumedAmount?: number;
}

const createReview = async (contentId: string, data: CreateReviewRequest) => {
  const res = await requestAutoRefresh({
    path: `/api/v1/contents/${contentId}/members/me/reviews`,
    method: "POST",
    body: data,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data;
};

export default createReview;
