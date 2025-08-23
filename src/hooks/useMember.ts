import { useQuery } from "@tanstack/react-query";
import requestAutoRefresh from "../utils/requestAutoRefresh";
import { MemberDetailResponse } from "../types/member";

const fetchMember = async (id?: string): Promise<MemberDetailResponse> => {
  const path = `/api/v1/members/${id !== undefined ? id : "me"}`;

  const res = await requestAutoRefresh({
    path,
  });

  return res.data as MemberDetailResponse;
};

const useMember = ({ id }: { id?: string } = {}) => {
  return useQuery<MemberDetailResponse>({
    queryKey: [id ? "member_" + id : "me"],
    queryFn: () => fetchMember(id),
    retry: false,
  });
};

export default useMember;
