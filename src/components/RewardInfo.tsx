import { useQuery } from "@tanstack/react-query";
import { getReward } from "../api/backend/getReward";
import LoadingSpinner from "./LoadingSpinner";
import styled, { css } from "styled-components";
import { labelForDomain } from "../types/DomainType";
import { formatRelativeTime } from "../utils/timeUtils";
import Avatar from "./profiles/Avatar";
import { labelForReward } from "../types/rewardType";
import { TagColor } from "../styles/styled";

const Container = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px 18px;
`;

const Row = styled.div`
  margin-bottom: 15px;
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  strong {
    font-size: 12px;
    font-weight: 600;
  }
  span {
    font-size: 10px;
    color: ${({ theme }) => theme.card.basic.paleText};
  }
`;

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.span<{ tone?: TagColor }>`
  ${({ tone = "sky", theme }) => {
    return css`
      border: 1px solid ${({ theme }) => theme.content.tag[tone].border};
      background: ${theme.content.tag[tone].background};
      color: ${theme.content.tag[tone].text};
    `;
  }}
  padding:6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
`;

const Description = styled.p`
  max-width: 800px;
  max-height: 500px;
  margin: 0;
  line-height: 1.55;
  white-space: pre;
  overflow-y: auto;
`;

const Section = styled.section`
  display: grid;
  gap: 8px;
`;
const SectionTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
`;

const BadgeBox = styled.div`
  border: 1px solid ${({ theme }) => theme.card.info.border};
  border-radius: 12px;
  padding: 12px;
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 12px;
  align-items: center;
  background-color: ${({ theme }) => theme.card.info.background};
  color: ${({ theme }) => theme.card.info.text};
`;

const ExpBox = styled.div`
  border: 1px solid ${({ theme }) => theme.card.warn.border};
  border-radius: 12px;
  padding: 12px;
  background-color: ${({ theme }) => theme.card.warn.background};
  color: ${({ theme }) => theme.card.warn.text};
  font-size: 14px;
  font-weight: 600;
`;

const BadgeIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.card.basic.border};
  display: grid;
  place-items: center;
  font-size: 28px;
`;

const BadgeIcon = styled.img`
  width: 100%;
  font-size: 12px;
`;

const KeyValue = styled.div`
  display: grid;
  gap: 4px;
  font-size: 14px;
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.card.basic.paleText};
  }
`;

const Divider = styled.hr`
  height: 1px;
  border: none;
  background: #e8ebf0;
`;

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  font-size: 12px;
`;

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.card.basic.paleText};
`;

const RewardInfo = ({ id }: { id: string }) => {
  const { data: reward, isLoading } = useQuery({
    queryKey: ["reward", id],
    queryFn: () => getReward(id),
    retry: false,
  });

  if (isLoading) return <LoadingSpinner />;

  if (!reward) return <div>Reward not found</div>;

  return (
    <Container>
      <Title>{reward.title}</Title>
      <Row>
        <Chips>
          <Chip tone="blue">{labelForDomain[reward.sourceType]}</Chip>
          <Chip tone={reward.reward ? "sky" : "yellow"}>
            {labelForReward[reward.rewardType]}
          </Chip>
          <Chip tone={reward.isPublic ? "green" : "red"}>
            {reward.isPublic ? "Public" : "Private"}
          </Chip>
        </Chips>
      </Row>

      {reward.description && (
        <Section>
          <SectionTitle>설명 💬</SectionTitle>
          <Description>{reward.description}</Description>
        </Section>
      )}

      <Section aria-label="Badge Reward">
        <SectionTitle>보상🏅</SectionTitle>
        {reward.reward ? (
          <BadgeBox>
            <BadgeIconWrapper aria-hidden>
              <BadgeIcon src={reward.reward?.icon} alt={reward.reward?.name} />
            </BadgeIconWrapper>
            <KeyValue>
              <strong>{reward.reward?.name ?? "Unnamed Badge"}</strong>
              <span>{`${reward.reward.exp ?? "—"} EXP`}</span>
            </KeyValue>
          </BadgeBox>
        ) : (
          <ExpBox>{`${reward.exp ?? "-"} EXP`}</ExpBox>
        )}
      </Section>

      <Divider />

      <FooterInfo>
        <FooterWrapper>
          <span>생성: {formatRelativeTime(new Date(reward.createdAt))}</span>
          {Math.abs(
            new Date(reward.updatedAt).getTime() -
              new Date(reward.createdAt).getTime()
          ) >= 60_000 && (
            <>
              <span>•</span>
              <span>
                업데이트: {formatRelativeTime(new Date(reward.updatedAt))}
              </span>
            </>
          )}
        </FooterWrapper>
        <FooterWrapper>
          <Avatar url={reward.conferrer?.avatarUrl} size={24} />
          <Name>
            <strong>{reward.conferrer?.nickname ?? "Unknown"}</strong>
            <span>Lv.{reward.conferrer?.level ?? 0}</span>
          </Name>
        </FooterWrapper>
      </FooterInfo>
    </Container>
  );
};

export default RewardInfo;
