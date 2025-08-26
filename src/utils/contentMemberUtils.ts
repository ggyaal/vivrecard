import { CardColor } from "../styles/styled";

export const recommendedToCardColor = (recommended: number): CardColor => {
  if (recommended > 0) return "info";
  if (recommended === 0) return "basic";
  return "error";
};
