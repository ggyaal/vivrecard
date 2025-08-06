import styled from "styled-components";
import useMember from "../hooks/useMember";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Avatar from "../components/profiles/Avatar";
import { getTotalExp } from "../utils/memberUtils";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Wrapper = styled.div`
  padding: 32px;
  min-width: 800px;
  color: ${({ theme }) => theme.colors.text};
`;

const ProfileSection = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const Info = styled.div`
  flex: 1;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Nickname = styled.div`
  font-size: 36px;
  font-weight: 600;
`;

const Name = styled.div`
  margin-top: 15px;
  font-size: 18px;
  color: #bbb;
`;

const Email = styled.div`
  font-size: 15px;
  color: #bbb;
`;

const LevelInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Level = styled.div`
  width: 60px;
  height: 50px;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExpBar = styled.div`
  margin: 12px 0 5px 0;
  background: #444;
  height: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const ExpFill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease-in-out;
`;

const ExpInfo = styled.div`
  font-size: 14px;
  color: #bbb;
`;

const Divider = styled.hr`
  margin: 32px 0;
  border: 1px solid #444;
`;

const Member = () => {
  const { id } = useParams();
  const isSelf = id !== "me";
  const { data: member, isLoading } = useMember({
    id: isSelf ? undefined : id,
  });

  const [title, setTitle] = useState("로딩 중...");

  useEffect(() => {
    if (!isLoading && member?.nickname) {
      setTitle(member.nickname);
    }
  }, [isLoading, member?.nickname]);

  return (
    <>
      <Helmet key={title}>
        <title data-react-helmet="true">{title}</title>
        <meta name="description" content="member page of Vivre Card" />
      </Helmet>
      <Container>
        {isLoading ? (
          <LoadingSpinner />
        ) : member ? (
          <Wrapper>
            <ProfileSection>
              <Avatar url={member.avatarUrl} size={120} />
              <Info>
                <Top>
                  <Nickname>{member.nickname}</Nickname>
                  <Name>{member.name}</Name>
                  <Email>{member.email}</Email>
                </Top>
                <LevelInfo>
                  <Level>Lv.{member.level}</Level>
                  <ExpBar>
                    <ExpFill style={{ width: `${member.exp % 100}%` }} />
                  </ExpBar>
                  <ExpInfo>
                    {member.exp} / {getTotalExp(member.level)}
                  </ExpInfo>
                </LevelInfo>
              </Info>
            </ProfileSection>

            <Divider />
          </Wrapper>
        ) : (
          <div>로딩 실패...</div>
        )}
      </Container>
    </>
  );
};

export default Member;
