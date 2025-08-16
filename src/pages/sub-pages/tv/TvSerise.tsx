import { Outlet, useOutletContext } from "react-router-dom";
import { TvProps } from "../../Tv";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Stars from "../../../components/Stars";
import { ImTv } from "react-icons/im";
import IconImage from "../../../components/IconImage";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const PosterWrapper = styled.div`
  width: 300px;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoSection = styled.div`
  max-width: 810px;
  overflow-x: auto;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  font-size: 12px;
`;

const Tagline = styled.p`
  font-style: italic;
  margin: 16px 0;
`;

const Genres = styled.div`
  margin: 16px 0;
  span {
    background-color: ${({ theme }) => theme.content.block.background};
    color: ${({ theme }) => theme.content.block.text};
    padding: 4px 8px;
    margin-right: 8px;
    border-radius: 4px;
    font-size: 0.875rem;
  }
`;

const Menu = styled.div`
  display: flex;
  padding: 10px 0;
`;

const MenuItem = styled(NavLink)`
  position: relative;
  background-color: ${({ theme }) => theme.content.block.background};
  color: ${({ theme }) => theme.content.block.text};
  padding: 15px 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease-in-out;

  &.active {
    background-color: ${({ theme }) => theme.content.tag.secondary};
  }
`;

const Meta = styled.div``;

const TvSerise = () => {
  const { tv } = useOutletContext<{ tv: TvProps }>();

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  if (!tv) return <div>TV 정보가 없습니다.</div>;

  return (
    <Container>
      <PosterWrapper>
        {tv.poster_path ? (
          <Poster src={`${IMAGE_BASE}/${tv.poster_path}`} alt={tv.name} />
        ) : (
          <IconImage Icon={ImTv} size={55} />
        )}
      </PosterWrapper>
      <InfoSection>
        <Title>{tv.name}</Title>
        <SubTitle>{tv.original_name}</SubTitle>
        {tv.tagline && <Tagline>"{tv.tagline}"</Tagline>}

        <Stars score={tv.vote_average} showScore={true} />

        <Genres>
          {tv.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </Genres>

        <Menu>
          <MenuItem to="." end>
            작품 소개
          </MenuItem>
          <MenuItem to="seasons">시즌</MenuItem>
        </Menu>

        <Meta>
          <Outlet context={{ tv }} />
        </Meta>
      </InfoSection>
    </Container>
  );
};

export default TvSerise;
