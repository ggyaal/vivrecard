import { ContentMemberSimpleResponse } from "./contentMember";

export interface ReviewDetailResponse {
  id: string;
  info: ContentMemberSimpleResponse;
  message: string;
  star: number;
  completedCount: number;
  consumedAmount: number;
  updatedAt: string;
  createdAt: string;
}

export interface ReviewSimpleResponse {
  id: string;
  memberId: string;
  contentId: string;
  message: string;
  star: number;
  consumedAmount: number;
  updatedAt: string;
  createdAt: string;
}
