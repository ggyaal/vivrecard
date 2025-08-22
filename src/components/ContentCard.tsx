import { Link } from "react-router-dom";
import styled from "styled-components";
import IconImage from "./IconImage";
import { TbDeviceTvOff } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import FadeInImageCard from "./FadeInImageCard";

interface ContentCardProps {
  id: number;
  path: string;
  name: string;
  posterPath: string | null;
  firstDate: string;
  voteAverage: number;
}

const Container = styled(Link)`
  min-width: 150px;
`;

const Card = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.card.basic.border};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px ${({ theme }) => theme.card.basic.shadow};
  background: ${({ theme }) => theme.card.basic.background};
  color: ${({ theme }) => theme.card.basic.text};
  transition: all 0.2s ease;
  filter: brightness(0.8);
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    filter: none;
  }
`;

const PosterWrapper = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
`;

const Poster = styled.img`
  width: 100%;
`;

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 14px;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubInfo = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.card.basic.paleText};
  margin-bottom: 4px;
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.content.star};

  & > svg:not(:last-child) {
    margin-right: 5px;
  }
`;

const ContentCard = ({
  id,
  path,
  name,
  posterPath,
  firstDate,
  voteAverage,
}: ContentCardProps) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <Container to={path}>
      <FadeInImageCard>
        <Card>
          <PosterWrapper>
            {posterPath ? (
              <Poster src={`${BASE_URL}${posterPath}`} alt={name} />
            ) : (
              <IconImage Icon={TbDeviceTvOff} size={55} />
            )}
          </PosterWrapper>
          <Info>
            <Title>{name}</Title>
            <SubInfo>{firstDate}</SubInfo>
            <Rating>
              <FaStar size={12} />
              <span>{voteAverage.toFixed(1)}</span>
            </Rating>
          </Info>
        </Card>
      </FadeInImageCard>
    </Container>
  );
};

export default ContentCard;
