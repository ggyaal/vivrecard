import styled from "styled-components";
import { BadgeGrade, BadgeSimpleResponse } from "../types/badge";

const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconWrapper = styled.div`
  width: 200px;
  height: 200px;
`;

const Icon = styled.img<{ $mainColor: string; $subColor: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: drop-shadow(0 4px 8px ${({ $mainColor }) => `#${$mainColor}`})
    drop-shadow(0 4px 16px ${({ $subColor }) => `#${$subColor}`});
`;

const Title = styled.div<{ $grade: BadgeGrade }>`
  margin-top: 12px;
  font-size: 18px;
  font-weight: 600;
  color: ${({ $grade, theme }) =>
    theme.badge.grade[$grade.toLowerCase() as Lowercase<BadgeGrade>].color};
`;

const Level = styled.div<{ $levelColor: string }>`
  border-radius: 8px;
  padding: 4px 8px;
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  border: 2px solid ${({ $levelColor }) => `#${$levelColor}`};
`;

const BadgeCard = ({ badge }: { badge: BadgeSimpleResponse }) => {
  return (
    <Container>
      <IconWrapper>
        <Icon
          $mainColor={badge.mainColor}
          $subColor={badge.subColor}
          src={badge.icon}
          alt={badge.name}
        />
      </IconWrapper>
      <Title $grade={badge.grade}>{badge.name}</Title>
      <Level $levelColor={badge.color}>Lv. {badge.level}</Level>
    </Container>
  );
};

export default BadgeCard;
