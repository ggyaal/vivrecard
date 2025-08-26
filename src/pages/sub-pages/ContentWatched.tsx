import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { CardColor } from "../../styles/styled";
import { getMembersByContent } from "../../api/backend/getContentMember";
import LoadingSpinner from "../../components/LoadingSpinner";
import { recommendedToCardColor } from "../../utils/contentMemberUtils";
import Avatar from "../../components/profiles/Avatar";
import Stars from "../../components/Stars";
import Recommend from "../../components/Recommend";

const Container = styled.div`
  height: 450px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  text-align: end;
  padding: 0 5px;
  color: ${({ theme }) => theme.card.basic.paleText};
`;

const Wrapper = styled.div`
  min-height: 400px;
  overflow-y: auto;
  padding: 10px;
  box-shadow: inset 0 0 15px -5px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Card = styled.div<{ $color: CardColor }>`
  border: 1px solid ${({ $color, theme }) => theme.card[$color].border};
  background-color: ${({ $color, theme }) => theme.card[$color].background};
  color: ${({ $color, theme }) => theme.card[$color].text};
  padding: 8px 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CardTitle = styled.h1`
  font-size: 13px;
  font-weight: 600;
`;

const CardRecommed = styled.div``;

const CardReason = styled.div`
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 0 5px 5px;
`;

const ContentWatched = () => {
  const { contentId } = useOutletContext<{ contentId: string | undefined }>();
  const { data: contentMembers, isLoading } = useQuery({
    queryKey: ["content", contentId, "members"],
    queryFn: () => getMembersByContent({ contentId: contentId! }),
    enabled: !!contentId,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <Title>{`총 ${
        contentMembers ? contentMembers.totalElements : 0
      }명`}</Title>
      <Wrapper>
        <CardList>
          {contentId && contentMembers && contentMembers.content.length > 0 ? (
            contentMembers.content.map((contentMember) => (
              <Card
                key={contentMember.member.id}
                $color={recommendedToCardColor(contentMember.recommended)}
              >
                <CardWrapper>
                  <Avatar
                    to={`/members/${contentMember.member.id}`}
                    url={contentMember.member.avatarUrl}
                    size={24}
                  />
                  <CardTitle>{contentMember.member.nickname}</CardTitle>
                  <Stars
                    score={contentMember.star}
                    size={16}
                    showScore={true}
                    fontSize={12}
                  />
                  <CardRecommed>
                    <Recommend
                      recommended={contentMember.recommended}
                      size={24}
                    />
                  </CardRecommed>
                </CardWrapper>
                <CardWrapper>
                  <CardReason>{contentMember.recommendReason}</CardReason>
                </CardWrapper>
              </Card>
            ))
          ) : (
            <div>시청자가 없습니다.</div>
          )}
        </CardList>
      </Wrapper>
    </Container>
  );
};

export default ContentWatched;
