import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getRewards } from "../api/backend/getReward";
import MainLoadingSpinner from "../components/MainLoadingSpinner";
import { Helmet } from "react-helmet-async";
import BasicModal from "../components/BasicModal";
import { useState } from "react";
import RewardInfo from "../components/RewardInfo";
import { RewardType } from "../types/rewardType";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0 160px;
`;

const Title = styled.h1`
  margin: 30px 0;
  font-size: 24px;
  font-weight: 600;
`;

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.card.basic.background};
  border: 1px solid ${({ theme }) => theme.card.basic.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.card.basic.text};
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
`;

const CardMeta = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const CardReward = styled.div`
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${({ theme }) => theme.content.tag.orange.background};
  color: ${({ theme }) => theme.content.tag.orange.text};
`;

const Exp = styled.span`
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.correct.background};
  color: ${({ theme }) => theme.colors.correct.text};
`;

const Rewards = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: rewards, isLoading } = useQuery({
    queryKey: ["rewards"],
    queryFn: () => getRewards(),
  });

  if (isLoading) return <MainLoadingSpinner />;

  if (!rewards)
    return (
      <>
        <Helmet>
          <title>Rewards</title>
          <meta name="description" content="Rewards page of Vivre Card" />
        </Helmet>
        <Container>
          <Wrapper>
            <div>서버에 문제가 발생하였습니다.</div>
          </Wrapper>
        </Container>
      </>
    );

  return (
    <>
      <Container>
        <Wrapper>
          <Title>도전과제</Title>
        </Wrapper>
        <Wrapper>
          <Grid>
            {rewards.content.map((reward) => (
              <Card key={reward.id} onClick={() => setSelectedId(reward.id)}>
                <CardTitle>{reward.title}</CardTitle>
                <CardMeta>
                  {reward.rewardType !== RewardType.NONE && (
                    <CardReward>{reward.rewardType}</CardReward>
                  )}
                  <Exp>EXP +{reward.exp}</Exp>
                </CardMeta>
              </Card>
            ))}
          </Grid>
        </Wrapper>
      </Container>
      <BasicModal open={!!selectedId} onClose={() => setSelectedId(null)}>
        <RewardInfo id={selectedId!} />
      </BasicModal>
    </>
  );
};

export default Rewards;
