import { PageResponse } from "../../types/api";
import { NotificationResponse } from "../../types/notification";
import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getNotification = async ({
  memberId = "me",
  page,
  signal,
}: {
  memberId?: string;
  page?: number;
  signal?: AbortSignal;
}) => {
  const res = await requestAutoRefresh<PageResponse<NotificationResponse>>({
    path: `/api/v1/members/${memberId}/notifications?sort=createdAt,desc&size=10&read=true&${
      page ? `&page=${page}` : ""
    }`,
    requiredLogin: true,
    signal,
  });

  if (!res.isSuccess) {
    return {} as PageResponse<NotificationResponse>;
  }

  return res.data;
};

export const readNotification = async (id: string, isRead: boolean = true) => {
  const res = await requestAutoRefresh<NotificationResponse>({
    path: `/api/v1/members/me/notifications/${id}/read${
      isRead ? "" : "?read=false"
    }`,
    method: "PATCH",
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data;
};

export const deleteNotification = async (id: string) => {
  const res = await requestAutoRefresh<null>({
    path: `/api/v1/members/me/notifications/${id}`,
    method: "DELETE",
    requiredLogin: true,
    noContent: true,
  });

  return res.isSuccess;
};
