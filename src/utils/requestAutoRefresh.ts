const requestAutoRefresh = async <T = any>({
  path,
  method = "GET",
  headers = {},
  body,
  requiredLogin = true,
}: {
  path: string;
  method?: string;
  headers?: HeadersInit;
  body?: any;
  requiredLogin?: boolean;
}): Promise<T> => {
  const doFetch = async (token: string | null) => {
    return fetch(process.env.REACT_APP_API_URL + path, {
      method,
      headers: {
        ...(headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });
  };

  let accessToken: string | null = localStorage.getItem("accessToken");
  if (requiredLogin && !accessToken) {
    throw new Error("로그인이 필요한 요청입니다.");
  }

  let res = await doFetch(accessToken);

  if (res.ok) return res.json();

  if (res.status !== 401) {
    throw new Error("데이터를 가져오는 데에 실패하였습니다.");
  }

  const refreshRes = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v1/tokens/refresh`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  if (!refreshRes.ok) {
    throw new Error("토큰 갱신에 실패하였습니다. 다시 로그인해주세요.");
  }

  const { accessToken: newToken } = await refreshRes.json();

  if (newToken) localStorage.setItem("accessToken", newToken);

  res = await doFetch(newToken);

  if (!res.ok) {
    throw new Error("데이터를 가져오는 데에 실패하였습니다.");
  }

  return res.json();
};

export default requestAutoRefresh;
