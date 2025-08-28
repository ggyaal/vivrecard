import styled from "styled-components";
import { LevelBucket, toLevelBucket } from "../../utils/memberUtils";

const Container = styled.div<{ $level: LevelBucket }>`
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  background: ${({ theme, $level }) => theme.member.level[$level].background};
  color: ${({ theme, $level }) => theme.member.level[$level].text};
`;

const MemberLevel = ({ level }: { level: number }) => {
  return <Container $level={toLevelBucket(level)}>{level}</Container>;
};

export default MemberLevel;
