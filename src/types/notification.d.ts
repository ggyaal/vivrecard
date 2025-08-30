import { DomainSimpleType, DomainType } from "./domainType";
import { NotificationType } from "./notificationType";

export type Related = {
  [K in DomainType]: { relatedType: K; related: DomainSimpleType[K] };
}[DomainType];

export interface NotificationResponse<P = object> {
  id: string;
  type: NotificationType;
  publisher: P;
  title: string;
  message: string;
  related: Related[];
  readAt: string | null;
  createdAt: string;
}
