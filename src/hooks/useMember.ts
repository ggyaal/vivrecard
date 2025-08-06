import { useQuery } from "@tanstack/react-query";
import requestAutoRefresh from "../utils/requestAutoRefresh";

export interface Member {
  id: string;
  name: string;
  nickname: string;
  email: string;
  avatarUrl: string;
  level: number;
  exp: number;
  isActive: boolean;
}

const fetchMember = async (id?: string): Promise<Member> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found");
  }

  const path = `/api/v1/members/${id !== undefined ? id : "me"}`;

  const res = await requestAutoRefresh({
    path,
  });

  return res.data as Member;
};

const useMember = ({ id }: { id?: string } = {}) => {
  return useQuery<Member>({
    queryKey: ["member"],
    queryFn: async () => fetchMember(id),
    retry: false,
    staleTime: 10 * 60 * 1000,
  });
};

export default useMember;
