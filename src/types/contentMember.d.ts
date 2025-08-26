import { ContentSimpleResponse } from "./content";
import { MemberSimpleResponse } from "./member";

export interface ContentMemberDetailResponse {
  content: ContentSimpleResponse;
  member: MemberSimpleResponse;
  startAt: string;
  completedCount: number;
  recommended: number;
  recommendReason: string;
  star: number;
  consumedAmount: number | null;
  reviewCount: number;
  updatedAt: string;
  createdAt: string;
}

export interface ContentMemberSimpleResponse {
  content: ContentSimpleResponse;
  member: MemberSimpleResponse;
  recommended: number;
  recommendReason: string;
  star: number;
  updatedAt: string;
  createdAt: string;
}

export interface ContentMemberStarResponse {
  star: number;
  count: number;
}

export interface ContentMemberCreateRequest {
  startAt: string;
  isCompleted: boolean;
  recommended?: number;
  recommendReason?: string;
  star: number;
  consumedAmount?: number;
}

export interface ContentMemberUpdateRequest {
  isCompleted?: boolean;
  recommended?: number;
  recommendReason?: string;
  startAt?: string;
  star?: number;
  consumedAmount?: number;
}
