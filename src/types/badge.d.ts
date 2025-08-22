export interface BadgeDetailResponse {
  id: string;
  name: string;
  description: string;
  mainColor: string;
  subColor: string;
  maxLevel: number;
  exp: number;
  badgeLevels: BadgeLevelResponse[];
}

export interface BadgeLevelResponse {
  icon: string;
  color: string;
  level: number;
  grade: BadgeGrade;
  maxLevel: number;
}

export interface BadgeSimpleResponse {
  id: string;
  icon: string;
  level: number;
  name: string;
  color: string;
  mainColor: string;
  subColor: string;
  grade: BadgeGrade;
  rareLevel: number;
  exp: number;
}

type BadgeGrade = "NORMAL" | "RARE" | "EPIC" | "LEGENDARY" | "MYTHIC";
