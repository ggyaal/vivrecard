import {
  ContentMemberCreateRequest,
  ContentMemberDetailResponse,
  ContentMemberUpdateRequest,
} from "../../types/contentMember";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const createContentMember = async (
  contentId: string,
  memberId: string,
  data: ContentMemberCreateRequest
) => {
  const res = await requestAutoRefresh<ContentMemberDetailResponse>({
    path: `/api/v1/contents/${contentId}/members/${memberId}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
    requiredLogin: true,
  });

  return res.data;
};

export const updateContentMember = async (
  contentId: string,
  memberId: string,
  data: ContentMemberUpdateRequest
) => {
  const res = await requestAutoRefresh<ContentMemberDetailResponse>({
    path: `/api/v1/contents/${contentId}/members/${memberId}`,
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
    requiredLogin: true,
  });

  return res.data;
};
