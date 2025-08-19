import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { MemberDetailResponse } from "../../../types/member";
import styled from "styled-components";
import { APIPageResponse } from "../../../types/api";
import requestAutoRefresh from "../../../utils/requestAutoRefresh";
import LoadingSpinner from "../../../components/LoadingSpinner";

type PlatformName = "디스코드" | "구글";

interface CardPlatformProp {
  $platform: "디스코드" | "구글";
}

interface MemberPlatform {
  userName: string;
  email: string;
  avatarUrl: string;
  platform: {
    id: string;
    name: PlatformName;
    icon: string;
  };
}

const Container = styled.div`
  margin-top: 35px;
`;

const Wrapper = styled.div``;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 15px;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div<CardPlatformProp>`
  width: 100%;
  min-width: 350px;
  border-radius: 12px;
  background-color: ${({ $platform, theme }) =>
    theme[($platform as PlatformName) === "구글" ? "google" : "discord"]
      .background || theme.colors.primary};
  color: ${({ $platform, theme }) =>
    theme[($platform as PlatformName) === "구글" ? "google" : "discord"].text ||
    theme.colors.text};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.text};
`;

export const CardLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CardProfile = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.colors.primary || "#007bff"};
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardUserName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

export const CardUserEmail = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.shadow || "#777"};
`;

export const CardPlatfrom = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PlatformIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const PlatfromName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text || "#333"};
`;

const PageNav = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page = styled.div``;

const MemberConnects = () => {
  const { member } = useOutletContext<{ member: MemberDetailResponse }>();
  const { data: connects, isLoading } = useQuery<
    APIPageResponse<MemberPlatform>
  >({
    queryKey: ["member-connects"],
    queryFn: () =>
      requestAutoRefresh({
        path: `/api/v1/member-platforms?memberId=${member.id}&size=4`,
      }),
    enabled: !!member.id,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!connects) return <div>문제 발생</div>;

  return (
    <Container>
      <Wrapper>
        <CardList>
          {connects.data.content.map((pm, idx) => (
            <Card key={idx} $platform={pm.platform.name}>
              <CardLayout>
                <CardWrapper>
                  <CardProfile src={pm.avatarUrl} />
                </CardWrapper>
                <CardWrapper>
                  <CardInfo>
                    <CardUserName>{pm.userName}</CardUserName>
                    <CardUserEmail>{pm.email}</CardUserEmail>
                  </CardInfo>
                </CardWrapper>
              </CardLayout>
              <CardLayout>
                <CardPlatfrom>
                  <PlatformIcon src={pm.platform.icon} />
                  <PlatfromName>{pm.platform.name}</PlatfromName>
                </CardPlatfrom>
              </CardLayout>
            </Card>
          ))}
        </CardList>
        <PageNav>
          <Page>{`${connects.data.page + 1}/${connects.data.totalPages}`}</Page>
        </PageNav>
      </Wrapper>
    </Container>
  );
};

export default MemberConnects;
