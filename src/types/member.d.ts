export interface MemberSimpleResponse {
  id: string;
  nickname: string;
  avatarUrl: string;
  level: number;
  exp: number;
}

export interface MemberDetailResponse {
  id: string;
  name: string;
  nickname: string;
  email: string;
  avatarUrl: string;
  level: number;
  exp: number;
  isActive: boolean;
}
