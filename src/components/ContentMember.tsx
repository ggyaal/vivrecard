import {
  QueryFunctionContext,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { ContentMemberDetailResponse } from "../types/contentMember";
import {
  getCompletedRate,
  getContentMember,
} from "../api/backend/getContentMember";
import LoadingSpinner from "./LoadingSpinner";
import styled from "styled-components";
import Stars from "./Stars";
import Avatar from "./profiles/Avatar";
import { formatDate, formatDateTime } from "../utils/timeUtils";
import Recommend from "./Recommend";
import {
  getExpPercent,
  LevelBucket,
  toLevelBucket,
} from "../utils/memberUtils";
import { PageResponse } from "../types/api";
import { ReviewDetailResponse } from "../types/review";
import { getReviews } from "../api/backend/getReview";
import { useEffect, useRef } from "react";
import AmountTag from "./AmountTag";
import { formatContentSeriseLabel } from "../utils/contentUtils";
import { ContentType } from "../types/contentType";
import { CardColor } from "../styles/styled";
import { recommendedToCardColor } from "../utils/contentMemberUtils";

const Container = styled.div``;

const Header = styled.header`
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 16px;
  padding: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.card.basic.border};
`;

const Thumb = styled.div`
  min-width: 160px;
  aspect-ratio: 2 / 3;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.card.basic.paleText};
`;

const HeaderBody = styled.div`
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SeriesBadgeArea = styled.div`
  height: 20px;
`;

const SeriesBadge = styled.span`
  display: inline-block;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
  background-color: #eef2ff;
  color: #3730a3;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  line-height: 1.3;
  color: ${({ theme }) => theme.card.basic.text};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.card.basic.paleText};
  font-size: 14px;
`;

const MetaRow = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const MetaLabel = styled.span`
  color: ${({ theme }) => theme.card.basic.paleText};
  font-size: 12px;
`;

const MetaValue = styled.span`
  font-weight: 600;
  font-size: 14px;
`;

const Divider = styled.span`
  width: 1px;
  height: 16px;
  background-color: ${({ theme }) => theme.card.basic.border};
`;

const Section = styled.section`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.card.basic.border};
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.card.basic.text};

  span {
    margin-left: 10px;
    font-size: 16px;
  }
`;

const MemberCard = styled.div`
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 12px;
  align-items: center;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MemberName = styled.div`
  font-weight: 600;
`;

const LevelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LevelBadge = styled.span<{ $level: LevelBucket }>`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${({ theme, $level }) => theme.member.level[$level].background};
  color: ${({ theme, $level }) => theme.member.level[$level].text};
`;

const ExpBar = styled.div`
  position: relative;
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.card.info.background};
  overflow: hidden;
`;

const ExpBarFill = styled.div`
  position: absolute;
  inset: 0;
  width: 0%;
  background-color: ${({ theme }) => theme.card.info.text};
`;

const ExpText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.card.basic.paleText};
  width: 40px;
  text-align: right;
`;

const ReasonBox = styled.div<{ $color: CardColor }>`
  margin-top: 12px;
  padding: 12px;
  background-color: ${({ $color, theme }) => theme.card[$color].background};
  border: 1px solid ${({ $color, theme }) => theme.card[$color].border};
  color: ${({ $color, theme }) => theme.card[$color].text};
  border-radius: 8px;
`;

const ReasonTitle = styled.div`
  font-size: 12px;
  margin-bottom: 6px;
`;

const ReasonText = styled.p`
  max-height: 300px;
  height: fit-content;
  margin: 0;
  font-size: 14px;
  white-space: pre;
  overflow: auto;
`;

const ReviewWrapper = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;

const ReviewList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
`;

const ReviewItem = styled.li`
  border: 1px solid ${({ theme }) => theme.card.basic.border};
  border-radius: 10px;
  padding: 12px;
  background-color: ${({ theme }) => theme.card.basic.background};
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const ReviewContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
`;

const ReviewContentTitle = styled.div`
  color: ${({ theme }) => theme.content.text};
  font-size: 14px;
`;

const ReviewContentLabel = styled.div`
  border: 1px solid ${({ theme }) => theme.card.info.border};
  background-color: ${({ theme }) => theme.card.info.background};
  color: ${({ theme }) => theme.card.info.text};
  border-radius: 5px;
  padding: 2px 5px;
  font-size: 12px;
`;

const ReviewMeta = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.card.basic.paleText};
`;

const ReviewMessage = styled.p`
  margin: 8px 0 10px;
  line-height: 1.6;
`;

const ReviewFooter = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Footer = styled.footer`
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`;

const TimeText = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.card.basic.paleText};
`;

const ContentMember = ({
  contentId,
  memberId,
}: {
  contentId: string;
  memberId: string;
}) => {
  const { data: contentMember, isLoading } =
    useQuery<ContentMemberDetailResponse>({
      queryKey: ["content", contentId, "member", memberId],
      queryFn: () => getContentMember({ contentId, memberId }),
      retry: false,
    });
  const { data: completedRate } = useQuery({
    queryKey: ["content", contentId, "member", memberId, "completedRate"],
    queryFn: () => getCompletedRate({ contentId, memberId }),
    retry: false,
  });
  const {
    data: infiniteReviews,
    isLoading: reviewLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery<PageResponse<ReviewDetailResponse>>({
    queryKey: ["content", contentId, "member", memberId, "reviews"],
    initialPageParam: 0,
    queryFn: ({ pageParam, signal }: QueryFunctionContext) =>
      getReviews({
        contentId,
        memberId,
        includeChildren: true,
        page: pageParam as number,
        signal,
      }),
    getNextPageParam: (currPage) => {
      if (currPage.last) return undefined;

      return currPage.page + 1;
    },
    retry: false,
  });

  const loadMordRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loadMordRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(loadMordRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <LoadingSpinner />;

  if (!contentMember) return <div>서버에 문제가 발생하였습니다.</div>;

  const content = contentMember.content;
  const member = contentMember.member;

  let reviews: ReviewDetailResponse[] | null = null;
  if (infiniteReviews) {
    reviews = infiniteReviews.pages.flatMap((page) => page.content);
  }

  return (
    <Container>
      <Header>
        <Thumb style={{ backgroundImage: `url(${content.imageUrl})` }} />
        <HeaderBody>
          <SeriesBadgeArea>
            {content.series && (
              <SeriesBadge>시리즈 · {content.series.title}</SeriesBadge>
            )}
          </SeriesBadgeArea>
          <Title id="cmdm-title">{content.title}</Title>
          <Description id="cmdm-desc">{content.description}</Description>

          <MetaRow>
            <MetaItem>
              <MetaLabel>평균 별점</MetaLabel>
              <Stars
                score={contentMember.star}
                size={14}
                aria-label={`평균 별점 ${contentMember.star}점`}
              />
              <MetaValue>{contentMember.star.toFixed(1)} / 10.0</MetaValue>
            </MetaItem>
            <Divider />
            <MetaItem>
              <MetaLabel>완료율</MetaLabel>
              <MetaValue>{`${(
                contentMember.completedCount * 100 +
                (completedRate ? completedRate.completedRate : 0)
              ).toFixed(2)} %`}</MetaValue>
            </MetaItem>
            <Divider />
            <MetaItem>
              <MetaLabel>시작</MetaLabel>
              <MetaValue>{formatDate(contentMember.startAt)}</MetaValue>
            </MetaItem>
            <Divider />
            <MetaItem>
              <MetaLabel>완료 수</MetaLabel>
              <MetaValue>{contentMember.completedCount}</MetaValue>
            </MetaItem>
            <Divider />
            <MetaItem>
              <MetaLabel>추천</MetaLabel>
              <MetaValue>
                <Recommend recommended={contentMember.recommended} size={18} />
              </MetaValue>
            </MetaItem>
          </MetaRow>
          <MemberCard>
            <Avatar
              to={`/members/${member.id}`}
              url={member.avatarUrl}
              size={55}
            />
            <MemberInfo>
              <MemberName>{member.nickname}</MemberName>
              <LevelRow>
                <LevelBadge $level={toLevelBucket(member.level)}>
                  Lv.{member.level}
                </LevelBadge>
                <ExpBar>
                  <ExpBarFill
                    style={{
                      width: `${getExpPercent(member.level, member.exp)}%`,
                    }}
                  />
                </ExpBar>
                <ExpText>
                  {getExpPercent(member.level, member.exp).toFixed(2)}%
                </ExpText>
              </LevelRow>
            </MemberInfo>
          </MemberCard>
        </HeaderBody>
      </Header>

      {contentMember.recommendReason && (
        <Section>
          <ReasonBox $color={recommendedToCardColor(contentMember.recommended)}>
            <ReasonTitle>{`${
              contentMember.recommended < 0 ? "비" : ""
            }추천 이유`}</ReasonTitle>
            <ReasonText>{contentMember.recommendReason}</ReasonText>
          </ReasonBox>
        </Section>
      )}

      <Section>
        <SectionTitle>
          리뷰 💬
          <span>{infiniteReviews?.pages[0].totalElements} 개</span>
        </SectionTitle>
        {reviewLoading ? (
          <LoadingSpinner />
        ) : reviews ? (
          reviews.length === 0 ? (
            <div>작성된 리뷰가 없습니다.</div>
          ) : (
            <ReviewWrapper>
              <ReviewList>
                {reviews.map((r) => (
                  <ReviewItem key={r.id}>
                    <ReviewHeader>
                      <Stars
                        score={r.star}
                        size={16}
                        showScore={true}
                        aria-label={`별점 ${r.star}점`}
                      />
                      <AmountTag
                        amount={r.consumedAmount}
                        totalAmount={r.info.content.totalAmount}
                        type={r.info.content.contentType}
                      />
                      {![ContentType.SERIES, ContentType.MOVIE].includes(
                        r.info.content.contentType
                      ) && (
                        <ReviewContent>
                          <ReviewContentTitle>
                            {r.info.content.title}
                          </ReviewContentTitle>
                          <ReviewContentLabel>
                            {formatContentSeriseLabel(r.info.content)}
                          </ReviewContentLabel>
                        </ReviewContent>
                      )}
                    </ReviewHeader>
                    <ReviewMessage>{r.message}</ReviewMessage>
                    <ReviewFooter>
                      <ReviewMeta>{formatDateTime(r.createdAt)}</ReviewMeta>
                      {Math.abs(
                        new Date(r.updatedAt).getTime() -
                          new Date(r.createdAt).getTime()
                      ) >= 60_000 && (
                        <ReviewMeta>
                          • 업데이트: {formatDateTime(r.updatedAt)}
                        </ReviewMeta>
                      )}
                    </ReviewFooter>
                  </ReviewItem>
                ))}
                <div ref={loadMordRef} style={{ height: 1 }} />
              </ReviewList>
            </ReviewWrapper>
          )
        ) : null}
      </Section>

      <Footer>
        <TimeText>
          생성 {formatDateTime(contentMember.createdAt)} · 업데이트{" "}
          {formatDateTime(contentMember.updatedAt)}
        </TimeText>
      </Footer>
    </Container>
  );
};

export default ContentMember;
