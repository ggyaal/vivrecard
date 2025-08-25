import { PageResponse } from "../../types/api";
import {
  ContentMemberDetailResponse,
  ContentMemberSimpleResponse,
} from "../../types/contentMember";
import { ContentType } from "../../types/contentType";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getContentsByMember = async ({
  memberId,
  contentType,
  page,
}: {
  memberId: string;
  contentType?: ContentType[];
  page?: number;
}): Promise<PageResponse<ContentMemberSimpleResponse>> => {
  const res = await requestAutoRefresh<
    PageResponse<ContentMemberSimpleResponse>
  >({
    path: `/api/v1/members/${memberId}/contents?sort=updatedAt,desc&${
      contentType
        ? contentType.map((type) => `contentType=${type}&`).join("")
        : ""
    }${page ? `page=${page}` : ""}`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return {} as PageResponse<ContentMemberSimpleResponse>;
  }

  return res.data;
};

export const getMembersByContent = async ({
  contentId,
  page,
}: {
  contentId: string;
  page?: number;
}): Promise<PageResponse<ContentMemberSimpleResponse>> => {
  const res = await requestAutoRefresh<
    PageResponse<ContentMemberSimpleResponse>
  >({
    path: `/api/v1/contents/${contentId}/members?sort=updatedAt,desc&${
      page ? `page=${page}` : ""
    }`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return {} as PageResponse<ContentMemberSimpleResponse>;
  }

  return res.data;
};

export const getContentMember = async ({
  contentId,
  memberId,
}: {
  contentId: string;
  memberId: string;
}): Promise<ContentMemberDetailResponse> => {
  const res = await requestAutoRefresh<ContentMemberDetailResponse>({
    path: `/api/v1/contents/${contentId}/members/${memberId}`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return {} as ContentMemberDetailResponse;
  }

  return res.data;
};

export const getCompletedRate = async ({
  contentId,
  memberId,
}: {
  contentId: string;
  memberId: string;
}): Promise<{ completedRate: number }> => {
  const res = await requestAutoRefresh<{ completedRate: number }>({
    path: `/api/v1/contents/${contentId}/members/${memberId}/completedRate`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return {} as { completedRate: number };
  }

  return res.data;
};
