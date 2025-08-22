import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { MemberDetailResponse } from "../../../types/member";
import { useQuery } from "@tanstack/react-query";
import { getBadgeByMember } from "../../../api/backend/getBadge";
import LoadingSpinner from "../../../components/LoadingSpinner";
import BadgeCard from "../../../components/BadgeCard";

const Container = styled.div`
  padding: 20px 0;
`;

const Wrapper = styled.div``;

const BadgeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const MemberBadges = () => {
  const { member } = useOutletContext<{ member: MemberDetailResponse }>();
  const { data: badges, isLoading } = useQuery({
    queryKey: ["member", member.id, "badges"],
    queryFn: () => getBadgeByMember({ memberId: member.id }),
    enabled: !!member.id,
  });

  if (isLoading)
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );

  return (
    <Container>
      <Wrapper></Wrapper>
      <Wrapper>
        {badges ? (
          <BadgeList>
            {badges.content.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </BadgeList>
        ) : (
          <div>획득한 배지가 없습니다.</div>
        )}
      </Wrapper>
    </Container>
  );
};

export default MemberBadges;
