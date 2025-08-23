import { PageResponse } from "../../types/api";
import { ContentMemberSimpleResponse } from "../../types/contentMember";
import { ContentType } from "../../types/contentType";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getContentsByMember = async ({
  memberId,
  contentType,
  page,
}: {
  memberId: string;
  contentType?: ContentType;
  page?: number;
}): Promise<PageResponse<ContentMemberSimpleResponse>> => {
  const res = await requestAutoRefresh<
    PageResponse<ContentMemberSimpleResponse>
  >({
    path: `/api/v1/members/${memberId}/contents?sort=updatedAt,desc&${
      contentType ? `contentType=${contentType}&` : ""
    }${page ? `page=${page}` : ""}`,
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
  });

  if (!res.isSuccess) {
    return {} as PageResponse<ContentMemberSimpleResponse>;
  }

  return res.data;
};
