import { Link } from "react-router-dom";
import styled from "styled-components";
import IconImage from "./IconImage";
import { TbDeviceTvOff } from "react-icons/tb";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export interface TvProps {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const Container = styled(Link)`
  min-width: 150px;
`;

const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "visible",
})<{ visible: boolean }>`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  background: #fff;
  transition: all 0.2s ease;
  filter: brightness(0.8);
  cursor: pointer;
  opacity: ${({ visible }) => (visible ? 1 : 0)};

  &:hover {
    transform: translateY(-10px);
    filter: none;
  }
`;

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
`;

const Info = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  font-size: 12px;
  margin: 0 0 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubInfo = styled.div`
  font-size: 10px;
  color: #666;
  margin-bottom: 4px;
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  color: #f39c12;

  & > svg:not(:last-child) {
    margin-right: 5px;
  }
`;

const TvCard = ({ tv }: { tv: TvProps }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!tv.poster_path) {
      setVisible(true);
    }
  }, [tv.poster_path]);

  return (
    <Container to={`/tvs/${tv.id}`}>
      <Card visible={visible}>
        {tv.poster_path ? (
          <Poster
            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
            alt={tv.name}
            onLoad={() => setVisible(true)}
          />
        ) : (
          <IconImage background="#A9A9A9" Icon={TbDeviceTvOff} size={55} />
        )}
        <Info>
          <Title>{tv.name}</Title>
          <SubInfo>{tv.first_air_date}</SubInfo>
          <Rating>
            <FaStar size={12} />
            <span>{tv.vote_average.toFixed(1)}</span>
          </Rating>
        </Info>
      </Card>
    </Container>
  );
};

export default TvCard;
