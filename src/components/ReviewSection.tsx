import styled from "styled-components";
import Stars from "./Stars";
import useMember from "../hooks/useMember";
import Avatar from "./profiles/Avatar";
import StarSelector from "./StarSelector";
import { useEffect, useRef, useState } from "react";
import { getReviews, getReviewStars } from "../api/backend/getReview";
import { PageResponse } from "../types/api";
import { ReviewDetailResponse } from "../types/review";
import createReview from "../api/backend/createReview";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ContentMemberStarResponse } from "../types/contentMember";
import { formatRelativeTime } from "../utils/timeUtils";
import { Link, useSearchParams } from "react-router-dom";
import PageNav from "./PageNav";

interface ReviewSectionProps {
  id?: string | null;
  idRefetch: () => void;
  saveContent: () => Promise<string>;
}

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 20px 0;
`;

const WriterContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  box-shadow: 1px 1px 15px ${({ theme }) => theme.content.block.background};
  padding: 20px;
  border-radius: 10px;
`;

const AvatarWrapper = styled.div`
  margin-top: 45px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WriterWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.colors.paleText};
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Input = styled.textarea`
  width: 100%;
  min-height: 100px;
  resize: none;
  border: none;
  outline: none;
  padding: 20px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.paleText};
  color: ${({ theme }) => theme.content.text};
  background-color: ${({ theme }) => theme.content.background};
  border-radius: 5px;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReviewList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

const ReviewWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ReviewProfile = styled(Link)`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  transition: all 0.1s ease;

  &:hover {
    box-shadow: 5px 0 15px -5px ${({ theme }) => theme.colors.primary};
    transform: translateX(-5px);
  }
`;

const ReviewComment = styled.div`
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 1px 15px ${({ theme }) => theme.colors.shadow};
  white-space: pre;
`;

const ReviewDate = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.paleText};
`;

const ReviewSection = ({ id, idRefetch, saveContent }: ReviewSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const reviewPage = searchParams.get("reviewPage");
  const reviewPageNumber = Number(reviewPage) > 0 ? Number(reviewPage) - 1 : 0;
  const qc = useQueryClient();
  const { data: member, isLoading } = useMember();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [star, setStar] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const {
    data: reviews,
    isLoading: reviewLoading,
    refetch,
    dataUpdatedAt,
  } = useQuery<PageResponse<ReviewDetailResponse>>({
    queryKey: ["reviews", id, reviewPageNumber],
    queryFn: () => getReviews({ contentId: id!, page: reviewPageNumber }),
    enabled: !!id,
    placeholderData: keepPreviousData,
  });
  const { data: reviewStars } = useQuery<ContentMemberStarResponse | null>({
    queryKey: ["review", "stars", id],
    queryFn: () => getReviewStars(id!),
    enabled: !!id && !!reviews,
  });

  const prevUpdatedAt = useRef(dataUpdatedAt);

  useEffect(() => {
    if (!reviews) return;

    if (prevUpdatedAt.current === dataUpdatedAt) return;
    prevUpdatedAt.current = dataUpdatedAt;
    qc.invalidateQueries({ queryKey: [id, "reviewStars"] });
  }, [id, reviews, qc, dataUpdatedAt]);

  const handleInput = (e: React.InputEvent<HTMLTextAreaElement>) => {
    const el = inputRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <Container>
      <Wrapper>
        {!isLoading && member && (
          <WriterContainer>
            <AvatarWrapper>
              <Avatar url={member.avatarUrl} size={35} />
            </AvatarWrapper>
            <WriterWrapper>
              <ButtonWrapper>
                <StarSelector
                  count={10}
                  size={35}
                  value={star}
                  setValue={setStar}
                />
                <SubmitButton
                  onClick={async () => {
                    const contentId = id ? id : await saveContent();
                    if (!contentId) return;
                    idRefetch();

                    const review = await createReview(contentId, {
                      message,
                      star,
                    });

                    if (review) {
                      setMessage("");
                      setStar(0);
                      refetch();
                    }
                  }}
                >
                  등록
                </SubmitButton>
              </ButtonWrapper>
              <Input
                ref={inputRef}
                onInput={handleInput}
                name="review-input"
                placeholder="당신의 소감은?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </WriterWrapper>
          </WriterContainer>
        )}
      </Wrapper>
      {id && (
        <Wrapper>
          <Header>
            <h2>리뷰</h2>
            <Stars
              score={reviewStars ? reviewStars.star : 0}
              showScore={true}
            />
            {!reviewLoading && reviews && (
              <PageNav
                page={reviewPageNumber + 1}
                totalPage={reviews.totalPages}
                isFirst={reviewPageNumber === 0}
                isLast={reviews.last}
                shiftToPage={(page) => {
                  searchParams.set("reviewPage", String(page));
                  setSearchParams(searchParams);
                }}
              />
            )}
          </Header>
          <ReviewList>
            {!reviewLoading &&
            reviews &&
            reviews.content &&
            reviews.content.length > 0 ? (
              reviews.content.map((review) => (
                <ReviewContainer key={review.id}>
                  <ReviewWrapper>
                    <ReviewProfile to={`/members/${review.info.member.id}`}>
                      <Avatar url={review.info.member.avatarUrl} size={35} />
                      <div>{review.info.member.nickname}</div>
                    </ReviewProfile>
                    <Stars
                      score={review.star}
                      size={18}
                      showScore={true}
                      fontSize={12}
                    />
                    <ReviewDate>
                      {formatRelativeTime(new Date(review.createdAt))}
                    </ReviewDate>
                  </ReviewWrapper>
                  <ReviewComment>{review.message}</ReviewComment>
                </ReviewContainer>
              ))
            ) : (
              <div>리뷰가 없습니다.</div>
            )}
          </ReviewList>
        </Wrapper>
      )}
    </Container>
  );
};

export default ReviewSection;
