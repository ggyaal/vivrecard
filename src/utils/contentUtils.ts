import { ContentSimpleResponse } from "../types/content";
import { ContentType, ContentTypeLabel } from "../types/contentType";
import { formatHourMinutes } from "./timeUtils";

export const formatAmountByContentType = (
  amount: number | null,
  totalAmount: number,
  type: ContentType,
  showTail: boolean = false
) => {
  const isZero = !amount || amount === 0;
  const isCompleted = !isZero && amount === totalAmount;

  switch (type) {
    case "BOOK":
      if (isZero) return "아직 읽기 전";
      if (isCompleted) return "읽기 완료";
      return `${amount} 페이지 ${showTail ? "까지 읽음" : ""}`;

    case "SERIES":
      if (isZero) return "아직 시청 전";
      if (isCompleted) return "시청 완료";
      return `${amount} 시즌 ${showTail ? "까지 시청" : ""}`;

    case "SEASON":
      if (isZero) return "아직 시청 전";
      if (isCompleted) return "시청 완료";
      return `${amount} 에피소드 ${showTail ? "까지 시청" : ""}`;

    case "GAME":
      if (isZero) return "아직 플레이 전";
      if (isCompleted) return "플레이 완료";
      return `${formatHourMinutes(amount!)} ${showTail ? "까지 플레이" : ""}`;

    case "MUSIC":
      if (isZero) return "아직 청취 전";
      if (isCompleted) return "청취 완료";
      return `${formatHourMinutes(amount!)} ${showTail ? "까지 청취" : ""}`;

    case "MOVIE":
    case "EPISODE":
      if (isZero) return "아직 시청 전";
      if (isCompleted) return "시청 완료";
      return `${formatHourMinutes(amount!)} ${showTail ? "까지 시청" : ""}`;
  }

  return isZero ? "아직 이용 전" : `${amount} 개`;
};

export const formatAmount = (amount: number, type: ContentType) => {
  switch (type) {
    case "BOOK":
      return `${amount} 페이지`;
    case "SERIES":
      return `${amount} 시즌`;
    case "SEASON":
      return `${amount} 에피소드`;
    case "GAME":
    case "MUSIC":
    case "MOVIE":
    case "EPISODE":
      return `${formatHourMinutes(amount!)}`;
  }

  return `${amount} 개`;
};

export const formatContentSeriseLabel = (
  content: ContentSimpleResponse
): string => {
  if (!content.childrenIdx) return "";
  return `${content.series ? formatContentSeriseLabel(content.series) : ""} ${
    ContentTypeLabel[content.contentType]
  } ${content.childrenIdx}`;
};

export const idInPlatformToLink = (idInPlatform: string) => {
  const item = idInPlatform.split("_");

  if (item.length !== 2) {
    return idInPlatform;
  }

  return `/${item[0]}s/${item[1]}`;
};
