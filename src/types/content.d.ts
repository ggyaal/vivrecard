import { ContentType } from "./contentType";

export interface PlatformGenre {
  platformId: string;
  idInPlatform: string;
  genre: {
    name: string;
  };
}

export interface CreateContentProps {
  idInPlatform: string;
  content: {
    title: string;
    overview: string;
    rating: number;
    imageUrl: string;
    homepage?: string;
    totalAmount?: number;
    contentType: ContentType;
    parentId?: string;
  };
  genres: PlatformGenre[];
}

export interface GenreResponse {
  id: number;
  name: string;
}

export interface ContentSimpleResponse {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  series?: ContentSimpleResponse;
}

export interface ContentDetailResponse {
  id: string;
  title: string;
  overview: string;
  rating: number | null;
  imageUrl: string;
  homepage: string;
  totalAmount: number;
  contentType: ContentType;
  series?: ContentSimpleResponse;
  genres: GenreResponse[];
  updatedAt: string;
  createdAt: string;
}
