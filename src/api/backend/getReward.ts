import { PageResponse } from "../../types/api";
import { RewardDetailResponse, RewardSimpleResponse } from "../../types/reward";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getRewards = async () => {
  const res = await requestAutoRefresh<PageResponse<RewardSimpleResponse>>({
    path: "/api/v1/rewards",
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data;
};

export const getReward = async (id: string) => {
  const res = await requestAutoRefresh<RewardDetailResponse>({
    path: `/api/v1/rewards/${id}`,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data;
};
