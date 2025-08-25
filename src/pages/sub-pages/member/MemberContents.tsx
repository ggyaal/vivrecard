import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { MemberDetailResponse } from "../../../types/member";
import { getContentsByMember } from "../../../api/backend/getContentMember";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Stars from "../../../components/Stars";
import { TagColor } from "../../../styles/styled";
import { useState } from "react";
import BasicModal from "../../../components/BasicModal";
import ContentMember from "../../../components/ContentMember";
import { formatRelativeTime } from "../../../utils/timeUtils";
import { ContentType } from "../../../types/contentType";

const Container = styled.div`
  padding: 20px 0;
`;

const Wrapper = styled.div``;

const ContentList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const EmptyList = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

const ContentCard = styled.div<{ $recommended: TagColor }>`
  border: 1px solid
    ${({ $recommended, theme }) => theme.content.tag[$recommended].border};
  background-color: ${({ theme }) => theme.content.tag.default.background};
  color: ${({ $recommended, theme }) => theme.content.tag[$recommended].text};
  padding: 20px;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 5px 20px -5px ${({ theme }) => theme.colors.shadow};
  }
`;

const ContentCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ContentImgWrapper = styled.div`
  border: 1px solid;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  padding: 5px;
`;

const ContentImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const ContentTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 16px;
  font-weight: 600;
`;

const ContentCardFooter = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 10px;
  color: ${({ theme }) => theme.card.basic.paleText};
  font-size: 12px;
`;

const MemberContents = () => {
  const { member } = useOutletContext<{ member: MemberDetailResponse }>();
  const { data: contents, isLoading } = useQuery({
    queryKey: ["member", member.id, "contents"],
    queryFn: () =>
      getContentsByMember({
        memberId: member.id,
        contentType: [ContentType.SERIES, ContentType.MOVIE, ContentType.BOOK],
      }),
    retry: false,
  });
  const [selectedId, setSelectedId] = useState<string | null>();

  if (isLoading) {
    return (
      <Container>
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      </Container>
    );
  }

  if (!contents) {
    return (
      <Container>
        <Wrapper>
          <div>서버에 오류가 발생하였습니다.</div>
        </Wrapper>
      </Container>
    );
  }

  const toTagColor = (recommended: number): TagColor => {
    switch (recommended) {
      case -2:
        return "red";
      case -1:
        return "orange";
      case 1:
        return "green";
      case 2:
        return "blue";
      default:
        return "default";
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          {contents.content.length > 0 ? (
            <ContentList>
              {contents.content.map((content) => (
                <ContentCard
                  key={content.content.id}
                  $recommended={toTagColor(content.recommended)}
                  onClick={() => setSelectedId(content.content.id)}
                >
                  <ContentCardHeader>
                    <ContentImgWrapper>
                      <ContentImg src={content.content.imageUrl} />
                    </ContentImgWrapper>
                    <ContentTitle>{content.content.title}</ContentTitle>
                  </ContentCardHeader>
                  <Stars score={content.star} size={18} showScore={true} />
                  <ContentCardFooter>
                    {Math.abs(
                      new Date(content.updatedAt).getTime() -
                        new Date(content.createdAt).getTime()
                    ) >= 60_000 && (
                      <>
                        <span>
                          업데이트:{" "}
                          {formatRelativeTime(new Date(content.updatedAt))}
                        </span>
                        <span>•</span>
                      </>
                    )}
                    <span>
                      생성: {formatRelativeTime(new Date(content.createdAt))}
                    </span>
                  </ContentCardFooter>
                </ContentCard>
              ))}
            </ContentList>
          ) : (
            <EmptyList>활동 이력이 없습니다.</EmptyList>
          )}
        </Wrapper>
      </Container>
      <BasicModal open={!!selectedId} onClose={() => setSelectedId(null)}>
        <ContentMember contentId={selectedId!} memberId={member.id} />
      </BasicModal>
    </>
  );
};

export default MemberContents;
