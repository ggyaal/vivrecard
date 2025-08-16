import { useOutletContext } from "react-router-dom";
import { MovieProps } from "../../Movie";
import { useQuery } from "@tanstack/react-query";
import { movieCollection } from "../../../utils/tmdbUtils";
import LoadingSpinner from "../../../components/LoadingSpinner";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FadeInImageCard from "../../../components/FadeInImageCard";
import IconImage from "../../../components/IconImage";
import { LuPopcorn } from "react-icons/lu";
import { CollectionProps } from "../../Collection";

const Container = styled.div``;

const Wrapper = styled.div``;

const CollectionButton = styled(Link)`
  width: fit-content;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    box-shadow: 20px 2px 20px -5px ${({ theme }) => theme.colors.shadow};
    transform: translateX(-5px);
  }
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const PosterWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;

const Poster = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Parts = styled.div`
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

const CardList = styled.div`
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

const MovieCollection = () => {
  const { movie } = useOutletContext<{ movie: MovieProps }>();
  const { data: collection, isLoading } = useQuery<CollectionProps>({
    queryKey: ["collection", movie.belongs_to_collection?.id],
    queryFn: () => {
      const id = movie.belongs_to_collection?.id;
      if (!id) throw new Error("Collection ID is not available");
      return movieCollection(id);
    },
  });

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  if (isLoading) return <LoadingSpinner />;

  if (!collection) return <div>시리즈 정보가 없습니다.</div>;

  return (
    <Container>
      <Wrapper>
        <CollectionButton to={`/movies/collection/${collection.id}`}>
          <PosterWrapper>
            {collection.poster_path ? (
              <Poster src={`${IMAGE_BASE}/${collection.poster_path}`} />
            ) : (
              <IconImage Icon={LuPopcorn} size={25} />
            )}
          </PosterWrapper>
          <Title>{collection.name}</Title>
        </CollectionButton>
      </Wrapper>
      <Wrapper>
        <Parts>
          <CardList>
            {collection.parts.map((part) => (
              <FadeInImageCard key={part.id}>
                <Card to={`/movies/${part.id}`}>
                  <CardImgWrapper>
                    {part.poster_path ? (
                      <CardImg src={`${IMAGE_BASE}/${part.poster_path}`} />
                    ) : (
                      <IconImage Icon={LuPopcorn} size={55} />
                    )}
                  </CardImgWrapper>
                  <CardWrapper>
                    {part.title}
                    <InfoDate>{part.release_date}</InfoDate>
                  </CardWrapper>
                </Card>
              </FadeInImageCard>
            ))}
          </CardList>
        </Parts>
      </Wrapper>
    </Container>
  );
};

export default MovieCollection;
