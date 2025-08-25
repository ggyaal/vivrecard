export type LevelBucket = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const getTotalExp = (level: number): number => {
  let baseExp = 50;
  let increaseRate = 0.005;

  return Math.floor(
    increaseRate * Math.pow(level, 3) + (baseExp - increaseRate)
  );
};

export const getExpPercent = (level: number, exp: number): number => {
  return (exp / getTotalExp(level)) * 100;
};

export const toLevelBucket = (level: number): LevelBucket => {
  const b = Math.floor(level / 10);
  const clamped = Math.max(0, Math.min(9, b));
  return clamped as LevelBucket;
};
