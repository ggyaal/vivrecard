import { BadgeSimpleResponse } from "./badge";
import { ContentSimpleResponse } from "./content";
import { MemberSimpleResponse } from "./member";
import { RewardSimpleResponse } from "./reward";

export enum DomainType {
  GLOBAL = "globals",
  PLATFORM = "platforms",
  CHANNEL = "channels",
  MEMBER = "members",
  REWARD = "rewards",
  TASK = "tasks",
  PLEDGE = "pledges",
  BADGE = "badges",
  CONTENT = "contents",
}

export const labelForDomain: Record<DomainType, string> = {
  [DomainType.GLOBAL]: "글로벌",
  [DomainType.PLATFORM]: "플랫폼",
  [DomainType.CHANNEL]: "채널",
  [DomainType.MEMBER]: "회원",
  [DomainType.REWARD]: "도전과제",
  [DomainType.TASK]: "작업",
  [DomainType.PLEDGE]: "약속",
  [DomainType.BADGE]: "배지",
  [DomainType.CONTENT]: "콘텐츠",
};

export type DomainSimpleType = {
  [DomainType.GLOBAL]: any;
  [DomainType.PLATFORM]: any;
  [DomainType.CHANNEL]: any;
  [DomainType.MEMBER]: MemberSimpleResponse;
  [DomainType.REWARD]: RewardSimpleResponse;
  [DomainType.TASK]: any;
  [DomainType.PLEDGE]: any;
  [DomainType.BADGE]: BadgeSimpleResponse;
  [DomainType.CONTENT]: ContentSimpleResponse;
};
