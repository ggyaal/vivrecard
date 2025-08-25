import { ContentType } from "../types/contentType";
import { formatHourMinutes } from "./timeUtils";

export const formatAmountByContentType = (
  amount: number,
  type: ContentType,
  showTail: boolean = false
) => {
  switch (type) {
    case "BOOK":
      return `${amount ? amount : 0} 페이지 ${showTail ? "까지 읽음" : ""}`;
    case "SERIES":
      return `${amount ? amount : 0} 시즌 ${showTail ? "까지 시청" : ""}`;
    case "SEASON":
      return `${amount ? amount : 0} 에피소드 ${showTail ? "까지 시청" : ""}`;
    case "GAME":
      return `${amount ? formatHourMinutes(amount) : "0 분"} ${
        showTail ? "까지 플레이" : ""
      }`;
    case "MUSIC":
      return `${amount ? formatHourMinutes(amount) : "0 분"} ${
        showTail ? "까지 청취" : ""
      }`;
    case "MOVIE":
    case "EPISODE":
      return `${amount ? formatHourMinutes(amount) : "0 분"} ${
        showTail ? "까지 시청" : ""
      }`;
  }

  return `${amount ? amount : 0} 개`;
};
