import styled from "styled-components";
import useMember from "../hooks/useMember";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Avatar from "../components/profiles/Avatar";
import { getTotalExp } from "../utils/memberUtils";
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

const Nav = styled.nav``;

const NavUl = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;

const NavItem = styled.li<{ $active: boolean }>`
  flex: 1;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ $active }) => ($active ? "default" : "pointer")};
  transition: background-color 0.3s ease;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.sidebar : "transparent"};

  &:hover {
    background-color: ${({ theme }) => theme.colors.sidebar};
  }
`;

const Member = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const isSelf = id !== "me";
  const { data: member, isLoading } = useMember(
    isSelf
      ? {
          id,
        }
      : undefined
  );
  const navigate = useNavigate();

  const isActive = (tab: string) => pathname.endsWith(tab);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title data-react-helmet="true">"로딩 중..."</title>
          <meta name="description" content="member page of Vivre Card" />
        </Helmet>
        <Container>
          <Wrapper>
            <LoadingSpinner />
          </Wrapper>
        </Container>
      </>
    );
  }

  if (!member) {
    if (id === "me") navigate("/login");

    return (
      <Container>
        <Wrapper>
          <div>유저 정보를 불러오지 못했습니다.</div>
        </Wrapper>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title data-react-helmet="true">{member.nickname}</title>
        <meta name="description" content="member page of Vivre Card" />
      </Helmet>
      <Container>
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

          <Nav>
            <NavUl>
              <NavItem
                $active={isActive("badges")}
                onClick={() => navigate("badges")}
              >
                배지
              </NavItem>
              <NavItem
                $active={isActive("connects")}
                onClick={() => navigate("connects")}
              >
                연결
              </NavItem>
              <NavItem
                $active={isActive("reviews")}
                onClick={() => navigate("reviews")}
              >
                후기
              </NavItem>
            </NavUl>
          </Nav>
          <Outlet context={{ member }} />
        </Wrapper>
      </Container>
    </>
  );
};

export default Member;
