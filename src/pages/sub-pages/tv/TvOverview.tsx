import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import LanguageLabel from "../../../components/LanguageLabel";
import CountryLabel from "../../../components/CountryLabel";
import { TvDetailProps } from "../../../types/tv";

const Container = styled.div``;

const Wrapper = styled.div``;

const Overview = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const Block = styled.div`
  background-color: ${({ theme }) => theme.content.block.background};
  color: ${({ theme }) => theme.content.block.text};
  padding: 20px 10px;
  border-radius: 8px;
  max-width: 200px;
  white-space: nowrap;

  & > h1:first-child {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  & > span {
    display: flex;
    gap: 5px;
    overflow-x: auto;
    justify-content: center;
  }
`;

const TvOverview = () => {
  const { tv } = useOutletContext<{ tv: TvDetailProps }>();

  const handleXScroll = (e: React.WheelEvent<HTMLElement>) => {
    e.currentTarget.scrollLeft += e.deltaY;
  };

  return (
    <Container>
      <Wrapper>
        <Overview>{tv.overview}</Overview>
      </Wrapper>
      <Wrapper>
        <Info>
          <Block>
            <h1>방영일</h1>
            <span>
              {tv.first_air_date} - {tv.last_air_date}
            </span>
          </Block>
          <Block>
            <h1>시즌 수</h1>
            <span>{tv.number_of_seasons}</span>
          </Block>
          <Block>
            <h1>에피소드 수</h1>
            <span>{tv.number_of_episodes}</span>
          </Block>
          <Block>
            <h1>언어</h1>
            <span onWheel={handleXScroll}>
              {tv.spoken_languages.map((l) => (
                <LanguageLabel key={`l_${l.iso_639_1}`} code={l.iso_639_1} />
              ))}
            </span>
          </Block>
          <Block>
            <h1>제작 국가</h1>
            <span onWheel={handleXScroll}>
              {tv.production_countries.map((c) => (
                <CountryLabel
                  key={`c_${c.iso_3166_1}`}
                  isoCode={c.iso_3166_1}
                  showEmoji={true}
                />
              ))}
            </span>
          </Block>
        </Info>
      </Wrapper>
    </Container>
  );
};

export default TvOverview;
