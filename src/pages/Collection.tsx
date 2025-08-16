import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { movieCollection } from "../utils/tmdbUtils";
import LoadingSpinner from "../components/LoadingSpinner";
import { Helmet } from "react-helmet-async";
import { LuPopcorn } from "react-icons/lu";
import IconImage from "../components/IconImage";
import { Link } from "react-router-dom";
import FadeInImageCard from "../components/FadeInImageCard";
import { IoMdArrowRoundBack } from "react-icons/io";

interface PartProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CollectionProps {
  backdrop_path: string;
  id: number;
  name: string;
  overview: string;
  parts: PartProps[];
  poster_path: string;
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
`;

const Backdrop = styled.div<{ $url?: string }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 300px;
  aspect-ratio: ${({ $url }) => ($url ? "16 / 8" : "auto")};
  background-image: ${({ $url }) => $url && `url(${$url})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 100%;
  transform: translateY(-50%);
  max-width: 1200px;
  padding: 30px;
  color: ${({ theme }) => theme.content.text};
  background-color: ${({ theme }) => theme.content.background};
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ToolButton = styled(IoMdArrowRoundBack)`
  transition: all 0.1s ease;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: scale(1.1);
  }
`;

const Content = styled.div`
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
  flex: 1;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  margin-bottom: 24px;
  line-height: 1.6;
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

const Collection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: collection, isLoading } = useQuery<CollectionProps>({
    queryKey: ["collection", Number(id)],
    queryFn: () => {
      const collectionId = Number(id);
      if (isNaN(collectionId))
        throw new Error("Collection ID is not available");
      return movieCollection(collectionId);
    },
  });

  const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

  if (isLoading) return <LoadingSpinner />;

  if (!collection)
    return (
      <>
        <Helmet>
          <title>영화 시리즈</title>
          <meta
            name="description"
            content="Movie Collection page of Vivre Card"
          />
        </Helmet>
        <Container>
          <div>존재하지 않는 영화 시리즈입니다.</div>
        </Container>
      </>
    );

  return (
    <>
      <Helmet>
        <title>{collection.name}</title>
        <meta
          name="description"
          content="Movie Collection page of Vivre Card"
        />
      </Helmet>
      <Container>
        <Backdrop
          $url={
            collection.backdrop_path &&
            `${IMAGE_BASE}/${collection.backdrop_path}`
          }
        >
          <Wrapper>
            <Toolbar>
              <ToolButton size={32} onClick={() => navigate(-1)} />
            </Toolbar>
            <Content>
              <PosterWrapper>
                {collection.poster_path ? (
                  <Poster
                    src={`${IMAGE_BASE}${collection.poster_path}`}
                    alt={collection.name}
                  />
                ) : (
                  <IconImage Icon={LuPopcorn} size={75} />
                )}
              </PosterWrapper>
              <InfoSection>
                <Title>{collection.name}</Title>

                <Overview>{collection.overview}</Overview>

                <Parts>
                  <CardList>
                    {collection.parts.map((part) => (
                      <FadeInImageCard key={part.id}>
                        <Card to={`/movies/${part.id}`}>
                          <CardImgWrapper>
                            {part.poster_path ? (
                              <CardImg
                                src={`${IMAGE_BASE}/${part.poster_path}`}
                              />
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
              </InfoSection>
            </Content>
          </Wrapper>
        </Backdrop>
      </Container>
    </>
  );
};

export default Collection;
