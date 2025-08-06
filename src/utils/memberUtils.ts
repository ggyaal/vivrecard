export const getTotalExp = (level: number): number => {
  let baseExp = 50;
  let increaseRate = 0.005;

  return Math.floor(
    increaseRate * Math.pow(level, 3) + (baseExp - increaseRate)
  );
};
