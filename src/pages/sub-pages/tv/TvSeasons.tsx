import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { TvProps } from "../../Tv";
import { Link } from "react-router-dom";
import FadeInImageCard from "../../../components/FadeInImageCard";
import IconImage from "../../../components/IconImage";
import { ImTv } from "react-icons/im";

const Container = styled.div`
  padding: 20px 10px;
  max-width: 810px;
  overflow-x: auto;
  scrollbar-gutter: stable;

  &::-webkit-scrollbar {
    height: 15px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.shadow};
  }
`;

const Wrapper = styled.div`
  width: min-content;
  display: flex;
  gap: 15px;
`;

const Card = styled(Link)`
  width: 150px;
  border: 1px solid ${({ theme }) => theme.colors.shadow};
  border-radius: 15px;
  overflow: hidden;
  padding: 5px;
  cursor: pointer;
  transition: transform 0.1s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`;

const CardWrapper = styled.div`
  padding: 10px;
`;

const InfoDate = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.shadow};
  margin-top: 10px;
`;

const CardImgWrapper = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
`;

const CardImg = styled.img`
  width: 100%;
`;

const TvSeasons = () => {
  const { tv } = useOutletContext<{ tv: TvProps }>();

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  return (
    <Container>
      <Wrapper>
        {tv.seasons.map((season) => (
          <FadeInImageCard key={season.id}>
            <Card to={`${season.season_number}`}>
              <CardImgWrapper>
                {season.poster_path ? (
                  <CardImg src={`${IMAGE_BASE}/${season.poster_path}`} />
                ) : (
                  <IconImage Icon={ImTv} size={55} />
                )}
              </CardImgWrapper>
              <CardWrapper>
                {season.name}
                <InfoDate>{season.air_date}</InfoDate>
              </CardWrapper>
            </Card>
          </FadeInImageCard>
        ))}
      </Wrapper>
    </Container>
  );
};

export default TvSeasons;
