import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { ContentMemberDetailResponse } from "../types/contentMember";
import { getContentMember } from "../api/backend/getContentMember";
import Recommend from "./Recommend";
import useMember from "../hooks/useMember";
import BasicModal from "./BasicModal";
import { useEffect, useState } from "react";
import {
  createContentMember,
  updateContentMember,
} from "../api/backend/putContentMember";
import StarSelector from "./StarSelector";

interface RecommendModalProps {
  contentId?: string | null;
  size?: number;
  saveContent?: () => Promise<string>;
}

const Container = styled.button`
  filter: brightness(0.8);
  transition: all 0.2s ease;

  &:hover {
    filter: none;
    transform: scale(1.05);
  }
`;

const ModalContainer = styled.div`
  min-width: 800px;
  display: flex;
  flex-direction: column;
`;

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StarWrapper = styled.div`
  z-index: 1;
`;

const CompletedBox = styled.label`
  margin-left: auto;
  display: flex;
  align-items: center;
  font-size: 14px;

  & > input {
    display: none;
  }

  & > span {
    width: 20px;
    height: 20px;
    border: 1px solid ${({ theme }) => theme.content.tag.sky.border};
    background-color: ${({ theme }) => theme.content.tag.sky.background};
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-left: 8px;
    border-radius: 4px;
  }

  & > span::after {
    content: "";
    position: absolute;
    display: none;
    left: 5px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  & > input:checked + span {
    background-color: #4caf50;
    border-color: #4caf50;
  }

  & > input:checked + span::after {
    display: block;
  }
`;

const RecommendList = styled.div`
  padding: 10px 0;
  display: flex;
`;

const RecommendItem = styled.div<{ $active: boolean }>`
  transition: filter 0.2s ease;
  filter: ${({ $active }) => (!$active ? "brightness(0.4)" : "none")};

  &:hover {
    filter: none;
  }
`;

const TextareaWrapper = styled.div`
  position: relative;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  min-height: 300px;
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

const TextAreaLength = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  color: ${({ theme }) => theme.colors.paleText};
  font-size: 14px;
`;

const ErrorMsg = styled.div<{ $active: boolean }>`
  border: 1px solid ${({ theme }) => theme.card.error.border};
  background-color: ${({ theme }) => theme.card.error.background};
  color: ${({ theme }) => theme.card.error.text};
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
  border-radius: 5px;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  margin: 0 auto;
`;

const ModalButton = styled.button`
  background-color: ${({ theme }) => theme.button.tertiary.background};
  color: ${({ theme }) => theme.button.primary.text};
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: auto;

  &:hover {
    background-color: ${({ theme }) => theme.button.primary.background};
  }
`;

const RecommendModal = ({
  contentId,
  size = 42,
  saveContent,
}: RecommendModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [recommended, setRecommended] = useState<number>(0);
  const [reason, setReason] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [star, setStar] = useState<number>(0);
  const [watched, setWatched] = useState<boolean>(false);
  const { data: member } = useMember();
  const { data: contentMember, isLoading } =
    useQuery<ContentMemberDetailResponse>({
      queryKey: ["content", contentId, "member", member?.id],
      queryFn: () =>
        getContentMember({ contentId: contentId!, memberId: member!.id }),
      retry: false,
      enabled: !!contentId && !!member,
    });

  useEffect(() => {
    if (isLoading || !contentMember) return;

    if (contentMember.recommended) setRecommended(contentMember.recommended);
    if (contentMember.recommendReason) setReason(contentMember.recommendReason);
  }, [isLoading, contentMember]);

  if (isLoading)
    return (
      <Container>
        <Recommend recommended={0} size={size} />
      </Container>
    );

  return (
    <>
      <Container onClick={() => setOpen(true)}>
        <Recommend
          recommended={contentMember ? contentMember.recommended : 0}
          size={size}
        />
      </Container>
      <BasicModal open={open} onClose={() => setOpen(false)}>
        <ModalContainer>
          {!contentMember && (
            <ModalWrapper>
              <StarWrapper>
                <StarSelector
                  count={10}
                  value={star}
                  size={24}
                  setValue={setStar}
                />
              </StarWrapper>
              <CompletedBox>
                이미 시청함
                <input
                  type="checkbox"
                  checked={watched}
                  onChange={(e) => setWatched(e.target.checked)}
                />
                <span></span>
              </CompletedBox>
            </ModalWrapper>
          )}
          <RecommendList>
            {Array.from({ length: 5 }).map((_, i) => (
              <RecommendItem
                key={`recommend-icon-${i}`}
                $active={recommended + 2 === i}
                onClick={() => setRecommended(i - 2)}
              >
                <Recommend recommended={i - 2} size={34} />
              </RecommendItem>
            ))}
            <ErrorMsg $active={error.length > 0}>{error}</ErrorMsg>
            <ModalButton
              onClick={async () => {
                if (reason.length === 0) {
                  setError("추천/비추천에는 이유가 있어야 합니다.");

                  setTimeout(() => {
                    setError("");
                  }, 2000);
                  return;
                }

                const cId = contentId
                  ? contentId
                  : saveContent
                  ? await saveContent()
                  : null;

                if (!cId || !member) {
                  setError("데이터를 로드하는 데에 실패하였습니다.");
                  setTimeout(() => {
                    setError("");
                  }, 2000);
                  return;
                }

                const cm = contentMember
                  ? await updateContentMember(cId, contentMember.member.id, {
                      recommended,
                      recommendReason: reason,
                    })
                  : await createContentMember(cId, member.id, {
                      startAt: new Date().toISOString(),
                      isCompleted: watched,
                      recommended,
                      recommendReason: reason,
                      star,
                    });

                if (cm) {
                  setOpen(false);
                }
              }}
            >
              제출
            </ModalButton>
          </RecommendList>
          <TextareaWrapper>
            <ModalTextarea
              name="recommend-input"
              placeholder="추천 이유를 적어주세요:)(3000자 이내)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <TextAreaLength>{reason.length} / 3000</TextAreaLength>
          </TextareaWrapper>
        </ModalContainer>
      </BasicModal>
    </>
  );
};

export default RecommendModal;
