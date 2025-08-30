import { MemberSimpleResponse } from "./member";
import { ActivityType } from "./activityType";
import { DomainSimpleType, DomainType } from "./domainType";
import { RewardSimpleType, RewardType } from "./rewardType";

export interface RewardDetailResponse {
  id: string;
  conferrer: MemberSimpleResponse;
  sourceType: DomainType;
  source: DomainSimpleType[DomainType];
  rewardType: RewardType;
  reward: RewardSimpleType[RewardType];
  activityType: ActivityType;
  activityCount: number;
  title: string;
  description: string;
  exp: number;
  isPublic: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface RewardSimpleResponse {
  id: string;
  title: string;
  sourceType: DomainType;
  rewardType: RewardType;
  activityType: ActivityType;
  activityCount: number;
  exp: number;
  updatedAt: string;
  createdAt: string;
}
