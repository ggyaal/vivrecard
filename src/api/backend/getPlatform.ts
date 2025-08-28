import requestAutoRefresh from "../../utils/requestAutoRefresh";

export const getPlatformId = async (name: string): Promise<string | null> => {
  const res = await requestAutoRefresh({
    path: `/api/v1/platforms/names/${name}`,
    requiredLogin: true,
  });

  if (!res.isSuccess) {
    return null;
  }

  return res.data.id as string;
};
