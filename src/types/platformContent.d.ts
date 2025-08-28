import { ContentSimpleResponse } from "./content";
import { PlatformSimpleResponse } from "./platform";

export interface PlatformContentResponse {
  platform: PlatformSimpleResponse;
  content: ContentSimpleResponse;
  idInPlatform: string;
}
