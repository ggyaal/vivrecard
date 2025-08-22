import { BadgeSimpleResponse } from "./badge";

export enum RewardType {
  NONE = "NONE",
  BADGE = "BADGE",
}

export const labelForReward: Record<RewardType, string> = {
  [RewardType.NONE]: "경험치 보상",
  [RewardType.BADGE]: "배지 보상",
};

export type RewardSimpleType = {
  [RewardType.NONE]: null;
  [RewardType.BADGE]: BadgeSimpleResponse;
};
