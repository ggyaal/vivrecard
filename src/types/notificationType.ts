import { IconType } from "react-icons";
import { FaCog } from "react-icons/fa";
import { GiMedal, GiAxeSword, GiSwordBrandish, GiOwl } from "react-icons/gi";
import { MdLocalPostOffice } from "react-icons/md";
import { DomainType } from "./domainType";

export enum NotificationType {
  SYSTEM = "SYSTEM",
  INVITE = "INVITE",
  MENTION = "MENTION",
  PLEDGE = "PLEDGE",
  CHANNEL = "CHANNEL",
  REWARD = "REWARD",
}

export const labelForNotification: Record<NotificationType, string> = {
  [NotificationType.SYSTEM]: "시스템",
  [NotificationType.INVITE]: "초대",
  [NotificationType.MENTION]: "언급",
  [NotificationType.PLEDGE]: "약속",
  [NotificationType.CHANNEL]: "채널",
  [NotificationType.REWARD]: "보상",
};

export const notificationTypeIcon: Record<NotificationType, IconType> = {
  [NotificationType.SYSTEM]: FaCog,
  [NotificationType.INVITE]: MdLocalPostOffice,
  [NotificationType.MENTION]: GiOwl,
  [NotificationType.PLEDGE]: GiSwordBrandish,
  [NotificationType.CHANNEL]: GiAxeSword,
  [NotificationType.REWARD]: GiMedal,
};

export const toDomainType = {
  [NotificationType.CHANNEL]: DomainType.CHANNEL,
  [NotificationType.INVITE]: null,
  [NotificationType.MENTION]: DomainType.MEMBER,
  [NotificationType.PLEDGE]: DomainType.PLEDGE,
  [NotificationType.REWARD]: DomainType.REWARD,
  [NotificationType.SYSTEM]: null,
} as const satisfies Record<NotificationType, DomainType | null>;
