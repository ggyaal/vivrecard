import styled from "styled-components";
import Stars from "./Stars";
import useMember from "../hooks/useMember";
import Avatar from "./profiles/Avatar";
import StarSelector from "./StarSelector";
import { useEffect, useRef, useState } from "react";
import {
  getReviewsByContentId,
  getReviewStars,
} from "../api/backend/getReview";
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
import { useSearchParams } from "react-router-dom";
import PageNav from "./PageNav";
import { ContentType } from "../types/contentType";
import { formatAmount, formatAmountByContentType } from "../utils/contentUtils";
import AmountTag from "./AmountTag";

interface ReviewSectionProps {
  id?: string | null;
  contentType: ContentType;
  maxAmount: number;
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
  margin-top: 60px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.colors.paleText};
  border-radius: 5px;
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const WriterWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const AmountContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AmountInput = styled.input`
  width: 300px;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 2px;
  --val: 0%;

  &::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(
          to right,
          ${({ theme }) => theme.content.tag.green.background},
          ${({ theme }) => theme.content.tag.blue.background}
        )
        0 / var(--val) 100% no-repeat,
      ${({ theme }) => theme.content.subtext};
  }

  &::-moz-range-track {
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(
          to right,
          ${({ theme }) => theme.content.tag.green.background},
          ${({ theme }) => theme.content.tag.blue.background}
        )
        0 / var(--val) 100% no-repeat,
      ${({ theme }) => theme.content.subtext};
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.content.tag.blue.background};
    cursor: pointer;
    margin-top: -8px;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.content.tag.blue.background};
    cursor: pointer;
  }
`;

const AmountInfo = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 5px;
  color: ${({ theme }) => theme.content.subtext};
  bottom: -25px;
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

const ReviewProfile = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
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

const ReviewSection = ({
  id,
  contentType,
  maxAmount,
  saveContent,
}: ReviewSectionProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const reviewPage = searchParams.get("reviewPage");
  const reviewPageNumber = Number(reviewPage) > 0 ? Number(reviewPage) - 1 : 0;
  const qc = useQueryClient();
  const { data: member, isLoading } = useMember();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [star, setStar] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const {
    data: reviews,
    isLoading: reviewLoading,
    refetch,
    dataUpdatedAt,
  } = useQuery<PageResponse<ReviewDetailResponse>>({
    queryKey: ["reviews", id, reviewPageNumber],
    queryFn: () =>
      getReviewsByContentId({ contentId: id!, page: reviewPageNumber }),
    enabled: !!id && !!member,
    placeholderData: keepPreviousData,
  });
  const { data: reviewStars } = useQuery<ContentMemberStarResponse | null>({
    queryKey: ["review", "stars", id],
    queryFn: () => getReviewStars(id!),
    enabled: !!id && !!reviews && !!member,
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
                <AmountContainer>
                  <AmountInput
                    type="range"
                    min="0"
                    max={maxAmount}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setAmount(value);
                      e.target.style.setProperty(
                        "--val",
                        `${(value / maxAmount) * 100}%`
                      );
                    }}
                    value={amount}
                  />
                  <AmountInfo>
                    {formatAmountByContentType(amount, maxAmount, contentType)}{" "}
                    / {formatAmount(maxAmount, contentType)}
                  </AmountInfo>
                </AmountContainer>
                <StarSelector
                  count={10}
                  size={25}
                  value={star}
                  setValue={setStar}
                />
                <SubmitButton
                  onClick={async () => {
                    const contentId = id ? id : await saveContent();
                    if (!contentId) return;

                    const review = await createReview(contentId, {
                      message,
                      star,
                      consumedAmount: amount,
                    });

                    if (review) {
                      setMessage("");
                      setAmount(0);
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
                    <ReviewProfile>
                      <Avatar
                        to={`/members/${review.info.member.id}`}
                        url={review.info.member.avatarUrl}
                        size={35}
                      />
                      <div>{review.info.member.nickname}</div>
                    </ReviewProfile>
                    <Stars
                      score={review.star}
                      size={18}
                      showScore={true}
                      fontSize={12}
                    />
                    <AmountTag
                      amount={review.consumedAmount}
                      totalAmount={maxAmount}
                      type={contentType}
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
