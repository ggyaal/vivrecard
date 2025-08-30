import { BadgeSimpleResponse } from "../types/badge";
import { ContentSimpleResponse } from "../types/content";
import { DomainType } from "../types/domainType";
import { MemberSimpleResponse } from "../types/member";
import { PlatformSimpleResponse } from "../types/platform";
import { RewardSimpleResponse } from "../types/reward";

export const getRelatedImage = (related: object): string | null => {
  const IMAGE_KEYS = [
    "image",
    "url",
    "imageUrl",
    "icon",
    "thumbnail",
    "src",
  ] as const;

  for (const key of IMAGE_KEYS) {
    if (hasKey(related, key)) {
      const val = related[key];
      if (typeof val === "string" && val) return val;
    }
  }

  return null;
};

export const getExp = (publisher: object): number | null => {
  if (hasKey(publisher, "exp")) {
    const val = publisher["exp"];
    if (typeof val === "number" && val) return val;
  }

  return null;
};

export const getRelated = <T extends DomainType>(
  input: DataWrapper<T>
): DomainTypeMap[T] => {
  return input.related;
};

interface DomainTypeMap {
  [DomainType.GLOBAL]: object;
  [DomainType.PLATFORM]: PlatformSimpleResponse;
  [DomainType.CHANNEL]: object;
  [DomainType.MEMBER]: MemberSimpleResponse;
  [DomainType.REWARD]: RewardSimpleResponse;
  [DomainType.TASK]: object;
  [DomainType.PLEDGE]: object;
  [DomainType.BADGE]: BadgeSimpleResponse;
  [DomainType.CONTENT]: ContentSimpleResponse;
}

type DataWrapper<T extends DomainType = DomainType> = {
  type: T;
  related: DomainTypeMap[T];
};

function hasKey<K extends PropertyKey>(
  obj: object,
  key: K
): obj is Record<K, unknown> {
  return key in obj;
}
